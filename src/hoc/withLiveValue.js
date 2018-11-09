import {compose, lifecycle} from "recompose";

export const withLiveValue = () => compose(
  lifecycle({
    componentWillMount() {
      const {initialValue, updateValue, done} = this.props;
      if (initialValue) {
        updateValue && updateValue(initialValue);
        done && done(initialValue);
      }
    },
    componentWillUpdate(newProps) {
      const {initialValue: currInitialValue} = this.props;
      const {initialValue: newInitialValue, updateValue, done} = newProps;
      if (newInitialValue && newInitialValue !== currInitialValue) {
        updateValue && updateValue(newInitialValue);
        done && done(newInitialValue);
      }
    }
  })
);
