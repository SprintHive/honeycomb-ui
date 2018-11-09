/**
 * Copyright (c) 2018 SprintHive (Pty) Ltd (buzz@sprinthive.com)
 *
 * This source code is licensed under the Apache License, Version 2.0
 * found in the LICENSE file in the root directory of this source tree.
 */

import {compose, branch, renderComponent} from 'recompose'

export const nonOptimalStates = (states) =>
  compose(...states.map(s =>
    branch(s.when, renderComponent(s.render))
  ));
