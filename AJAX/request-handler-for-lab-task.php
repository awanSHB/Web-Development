<?php

$response = (object)[
  'action_status'     => false,
  'message'           => (object)[
    'error'           => null,
    'success'         => null
  ]
];

$data = file_get_contents("php://input");
$data = json_decode($data);

if (isset($data->api_key) === true and $data->api_key == 'ABC123') {
  $name = $data->name;
  $age = $data->age;
  $email = $data->email;
  $db_conn = new mysqli("localhost", "root", "", "special_topics");
  if ($db_conn->connect_errno) {
    $response->message->error = "Failed to connect with database.";
  } else {
    $insert_data = $db_conn->query("INSERT INTO `persons` (`email`, `name`, `age`) VALUES ('" . $email . "', '" . $name . "', '" . $age . "')");
    if ($insert_data) {
      $response->action_status = true;
      $response->message->success = "Data has been saved into database.";
    } else {
      $response->message->error = $db_conn->error;
    }
  }
} else {
  $response->message->error = "Un-Authorized";
}

echo json_encode($response) . "asdfasfas";
