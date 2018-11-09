/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

import {compose, withState, withHandlers} from 'recompose'

export const withToggle = compose(
  withState('toggledOn', 'updateToggle', (props) => props.toggledOn),
  withHandlers({
    show: ({ toggle }) => (e) => toggle(true),
    hide: ({ toggle }) => (e) => toggle(false),
    toggle: ({ updateToggle, onValueChanged, value, data }) => (e) => {
      updateToggle((current) => {
        onValueChanged && onValueChanged({data, toggledOn: !current});
        return !current
      })
    }
  })
);