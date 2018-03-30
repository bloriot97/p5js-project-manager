<html>
  <head>

    <?php
      $appName = $_GET['app'];
      $json = json_decode(file_get_contents("./app.json"), true);
    ?>

    <title> <?php echo $json['name']; ?> </title>
    <script src="../JS/p5.js"></script>
    <script src="../JS/p5.dom.js"></script>
    <script src="./sketch.js?nc=$no_cache"></script>
    <?php
    foreach ($json["jsfiles"] as $file) {
      echo "<script src='./$file'></script>";
    }
    ?>
    <h1> <?php echo $json['name']; ?></h1>

  </head>
</html>
