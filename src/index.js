import React from 'react';
import {combineEpics} from 'redux-observable';
import {setObservableConfig} from "recompose"
import config from "recompose/rxjsObservableConfig"

import boxStyles from "./BoxStyles";
import FlexBox from "./layout/FlexBox";
import Button from "./atoms/button/Button";
import SimpleInput from "./atoms/simpleInput/SimpleInput";
import Spinner from "./atoms/spinner/Spinner";
import SpinnerWithText from "./atoms/spinner/SpinnerWithText";
import Wizard from "./organisms/wizard/Wizard"
import WizardControls from "./organisms/wizard/WizardControls"
import FirstName from "./molecules/firstName/FirstName";
import LastName from "./molecules/lastname/Lastname";
import EmailAddress from "./molecules/emailAddress/EmailAddress";
import AddressInput from "./molecules/addressInput/AddressInput";
import CellNumber from "./molecules/cellNumber/CellNumber";
import IdNumber from "./molecules/idNumber/IdNumber";
import NumberOfDependants from "./molecules/dependants/NumberOfDependants";
import GrossIncome from "./molecules/income/GrossIncome";
import NetIncome from "./molecules/income/NetIncome";
import MonthlyBond from "./molecules/expenses/MonthlyBond";
import MonthlyRental from "./molecules/expenses/MonthlyRental";
import Maintenance from "./molecules/expenses/Maintenance";
import LoanAmount from "./molecules/loanAmount/LoanAmount";
import PaymentPeriod from "./molecules/payamentPeriod/PaymentPeriod";
import MaritalStatus from "./molecules/maritalStatus/MaritalStatus";
import JobType from "./molecules/jobType/JobType";
import EmploymentType from "./molecules/employmentType/EmploymentType";
import GrantBureauConsentButton from "./molecules/grantBureauConsent/GrantBureauConsentButton";
import ProofOfIdentity from "./molecules/proofOfIdentity/ProofOfIdentity";
import SelfHeadshot from "./molecules/selfheadshot/SelfHeadshot";
import ProofOfPresence from "./molecules/proofOfPresence/ProofOfPresence";
import Map from "./molecules/map/Map";
import {addressSearchChanged, addressSelected} from "./molecules/addressInput/AddressInputEpics";
import {addressInputReducer} from "./molecules/addressInput/AddressInputReducer";
import {monthlyLivingExpenseChanged} from "./molecules/expenses/ExpensesEpic";
import {getStyle, loadStyle, withStyle} from "./theme/ThemeManager";
import {uploadEvidenceReducer} from "./molecules/upload/EvidenceReducer";
import {evidenceCaptured} from "./molecules/upload/UploadEvidenceEpics";
import {withComponentStatusChanged} from "./molecules/propertyInput/PropertyInput";
import {nonOptimalStates} from "./hoc/nonOptimalStates";
import AcceptTandCs from "./molecules/acceptTandCs/AcceptTandCs";
import ButtonNoHover from "./atoms/toggleButton/ButtonNoHover";
import UnitNumber from "./molecules/unitNumber/UnitNumber";
import ProofOfIncome from "./molecules/proofOfIncome/ProofOfIncome";
import {proofOfIncomeCaptured} from "./molecules/proofOfIncome/ProofOfIncomeEpic";

const layout = {FlexBox};
const atoms = {Button, ButtonNoHover, SimpleInput, Spinner, SpinnerWithText};
const molecules = {FirstName, LastName, CellNumber, IdNumber, EmailAddress, AddressInput, MonthlyBond, MonthlyRental,
  Maintenance, NumberOfDependants, GrossIncome, NetIncome, LoanAmount, PaymentPeriod, MaritalStatus, JobType, UnitNumber,
  EmploymentType, GrantBureauConsentButton, ProofOfIdentity, SelfHeadshot, ProofOfPresence, Map, AcceptTandCs,
  ProofOfIncome};
const organisms = {Wizard, WizardControls};

const addressInputEpics = combineEpics(addressSearchChanged, addressSelected);
const monthlyExpenseEpics = combineEpics(monthlyLivingExpenseChanged);
const uploadEvidenceEpics = combineEpics(evidenceCaptured);
const uploadProofOfIncomeEpics = combineEpics(proofOfIncomeCaptured);

setObservableConfig(config);

const hocs = {withComponentStatusChanged, nonOptimalStates};

export default  {
  monthlyExpenseEpics,
  addressInputEpics,
  addressInputReducer,
  uploadEvidenceEpics,
  uploadEvidenceReducer,
  uploadProofOfIncomeEpics,
  layout,
  atoms,
  molecules,
  organisms,
  boxStyles,
  hocs,
  themeManager: {loadStyle, getStyle, withStyle}
};