<html>
  <body>
    <title> P5.JS </title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>

    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

  </body>

  <html>
    <?php
      $filesroot = scandir("./");
      $appsfolder = array();
      // GET THE APP FOLDERS
      foreach ($filesroot as &$value ) {
        if ( is_dir( "./".$value)){
          $files = scandir("./".$value);
          if ( in_array("app.json", $files))
          {
            array_push($appsfolder, $value);
          }
        }
      }
      // LIST APP
      $apps = array();
      foreach ($appsfolder as &$appf ) {
        $json = json_decode(file_get_contents("./".$appf."/app.json"), true);
        $apps[$appf] = $json;
      }

    ?>

    <div class="container">
      <h1> App Liste </h1>
      <?php
        $i = 0;
        echo '<div class="row">';
        foreach ($apps as $appf => $json) {
          echo "<div class='col-sm-4 appDiv'>";
          echo "<div>";
          echo "<a href='./play.php?app=$appf' >";
          echo "<img src='./".$appf."/".$json["thumbnail"]."'>";
          echo "<h3>".$json["name"].'</h3>';
          echo "</a>";
          echo "</div>";
          echo "</div>";

          $i = $i + 1;

          if ( $i == 3){
            echo '</div>';
            echo '<div class="row">';
            $i = 0;
          }
        }
        echo '</div>';
      ?>

    </div>


    </html>

  <style>
    body{
      background-color: #ecf0f1;
    }
    .appDiv{
      padding: 20px;
    }
    .appDiv img{
      width: 100%;
    }
  </style>

<html>
