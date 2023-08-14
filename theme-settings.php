<?php

/**
 * @file
 * Theme settings.
 */

use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_preprocess_page().
 */
function evc_form_system_theme_settings_alter(&$form, FormStateInterface $form_state, $form_id = NULL) {
  // Work-around for a core bug affecting admin themes. See issue #943212.
  if (isset($form_id)) {
    return;
  }

  $form['evc_selectors'] = [
    '#type'          => 'textfield',
    '#title'         => t('HTML Selectors'),
    '#default_value' => theme_get_setting('evc_selectors'),
    '#description'   => t("Include a comma separated list of HTML selectors to look for '+' and '.' characters and apply the 'text-primary' class."),
  ];
}
