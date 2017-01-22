package models

import slick.driver.PostgresDriver.api._

case class Todo(id: Int = 0, description: String, done: Boolean = false)

class TodoTable(tag: Tag) extends Table[Todo](tag, "TODO") {

  def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
  def description = column[String]("description")
  def done = column[Boolean]("done")

  def * = (id, description, done) <> (Todo.tupled, Todo.unapply _)
}