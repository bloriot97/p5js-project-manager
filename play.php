<html>
  <head>

    <?php
      $appFolder = $_GET["app"];
      $json = json_decode(file_get_contents("./$appFolder/app.json"), true);
    ?>
    <title> <?php echo $json['name']; ?> </title>
    <link href="https://fonts.googleapis.com/css?family=Maven+Pro" rel="stylesheet">
    <link href="./css/style.css" rel="stylesheet">
  </head>
  <body>
    <script>
      <?php
        echo "var resDir = './$appFolder/';"
      ?>
      var getResourcePath = function(path) {
        return resDir + path;
      }
    </script>

    <script src="./JS/p5.js"></script>
    <script src="./JS/p5.dom.js"></script>
    <?php
      echo "<script src='./$appFolder/sketch.js'></script>";

      foreach ($json["libraries"] as $file) {
        echo "<script src='./library/$file'></script>";
      }

      foreach ($json["jsfiles"] as $file) {
        echo "<script src='./$appFolder/$file'></script>";
      }
    ?>
    <h1> <?php echo $json['name']; ?></h1>
    <div id="sketch-holder">

    </div>
    <div class="info">
      <h2>Info</h2>
      <div>
        <?php
          echo $json['description']."<br>";
          echo "Version : ".$json['version']."<br>";
          echo "<a href='./$appFolder' target='_blank'> Source </a>";
        ?>

      </div>
    </div>

    <script>
      let canvas = document.getElementById("defaultCanvas0");
    </script>

  </body>
</html>
