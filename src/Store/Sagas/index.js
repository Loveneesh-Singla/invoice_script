import { authSaga } from "./Auth";
import { all } from "redux-saga/effects";
import { senderComPanyInfoSaga } from "./SenderCompanyInfo";
import { clientsSaga } from "./Clients";
export default function* rootSaga() {
  yield all([authSaga(), senderComPanyInfoSaga(), clientsSaga()]);
}
