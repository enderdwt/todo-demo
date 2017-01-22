name := "todo-demo"

version := "1.0.0-SNAPSHOT"

scalaVersion := "2.11.8"

enablePlugins(PlayScala, DockerPlugin)

// Play provides two styles of routers, one expects its actions to be injected, the
// other, legacy style, accesses its actions statically.
routesGenerator := InjectedRoutesGenerator

libraryDependencies ++= Seq(
  "org.postgresql" % "postgresql" % "9.4.1208",
  "com.typesafe.slick" %% "slick" % "3.1.1",
  "com.typesafe.play" %% "play-slick" % "2.0.0",
  "com.typesafe.play" %% "play-slick-evolutions" % "2.0.0",
  "org.webjars" %% "webjars-play" % "2.5.0",
  "org.webjars" % "jquery" % "3.0.0",
  "org.webjars" % "react" % "15.1.0"
)


dockerBaseImage := "enderdwt/java"
