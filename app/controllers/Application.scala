package controllers

import com.google.inject.Inject
import models._
import play.api.Configuration
import play.api.db.slick.DatabaseConfigProvider
import play.api.mvc._
import play.api.mvc.BodyParsers._
import play.api.libs.json.Json
import play.api.libs.json.Json._
import scala.concurrent.Future
import slick.driver.JdbcProfile

import scala.concurrent.ExecutionContext.Implicits.global

class Application @Inject()(dbConfigProvider: DatabaseConfigProvider, configuration: Configuration) extends Controller {

  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig.driver.api._

  val Todos = TableQuery[TodoTable]
  implicit val todoFormat = Json.format[Todo]

  def index = Action { implicit request =>
    val hostname = configuration.getString("hostname")
    Ok(views.html.index())
  }

  def getTodos = Action.async {
      dbConfig.db.run(Todos.sortBy(_.id).result).map { todos =>
      Ok(toJson(todos))
    }
  }

  def createTodo = Action.async(parse.tolerantText) { request =>
    val newTodo = Todo(description = request.body)
    dbConfig.db.run(Todos returning Todos += newTodo).map { savedTodo =>
      Ok(toJson(savedTodo))
    }
  }

  def toggleFinished(id: Int) = Action.async(parse.tolerantText) { request =>
    val todo = for { t <- Todos if t.id === id } yield t.done
    dbConfig.db.run(todo.update(request.body.toBoolean)).map { result =>
      NoContent
    }
  }

  def getHostname = Action {
    Ok(configuration.getString("hostname").getOrElse(""))
  }
}
