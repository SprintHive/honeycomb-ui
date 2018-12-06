
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