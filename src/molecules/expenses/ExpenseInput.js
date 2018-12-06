
import React from "react";
import {compose, setDisplayName, withHandlers, withProps} from "recompose";
import SimpleInput from "../../atoms/simpleInput/SimpleInput";
import {numberFilter, withFiltering} from "../../hoc/withFiltering";
import {mapEntityNameToEntity, withComponentStatusChanged} from "../propertyInput/PropertyInput";
import {monthlyExpenseChanged} from "./ExpensesActions";

const populateInitialValue = compose(
  setDisplayName("populateInitialValue"),
  withProps((props) => {
    const {propertyName, entity} = props;
    const {monthlyLivingExpenses} = entity;
    let initialValue = "";
    if (monthlyLivingExpenses && monthlyLivingExpenses[propertyName]) {
      initialValue = monthlyLivingExpenses[propertyName];
    }
    return {initialValue};
  })
);

const enhance = compose(
  setDisplayName("MonthlyBond"),
  withProps(() => {
    return {
      entityName: "application",
      entityIdName: "applicationId"
    }
  }),
  withFiltering([numberFilter]),
  withComponentStatusChanged,
  mapEntityNameToEntity,
  populateInitialValue,
  withHandlers({
    done: props => value => {
      const {dispatch, componentStatusChanged, lead, endpoint, propertyName} = props;
      dispatch(monthlyExpenseChanged({leadId: lead.leadId, endpoint, propertyName, value}));
      componentStatusChanged && componentStatusChanged("captured");
    },
    pending: ({componentStatusChanged}) => () => {
      componentStatusChanged && componentStatusChanged("pending");
    }
  })
);

export default enhance(SimpleInput);