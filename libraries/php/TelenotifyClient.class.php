<?php

class TelenotifyClient
{
  private $settings;

  function __construct($settings)
  {
    if (!array_key_exists('server', $settings)) {
      throw new InvalidArgumentException("Telenotify server address should be defined.");
    }

    if (!array_key_exists('key', $settings)) {
      throw new InvalidArgumentException("Telenotify key should be defined.");
    }

    $this->settings = $settings;
  }

  function send($message) {
    $url = "{$this->settings['server']}?key={$this->settings['key']}&text=$message";
    try {
      return file_get_contents($url);
    } catch (Exception $e) {
      return null;
    }
  }
}
