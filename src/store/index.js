import firebase from "../utils/firebase";
import { extendObservable, observable, action, autorun } from "mobx";

const database = firebase.database();

class Store {
  @observable data = null;
  @observable hasLoaded = false;

  constructor() {
    database.ref().on("value", this.onFirebaseValue);
    // todo: off
  }

  onFirebaseValue = snapshot => {
    this.data = snapshot.val();
    if (this.data === null) this.data = {};
    this.hasLoaded = true;
  };

  addNewQuestion(questionText) {
    database
      .ref()
      .push()
      .set({
        question: {
          text: questionText,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }
      });
  }

  addNewAnswer(questionKey, answerText) {
    firebase
      .database()
      .ref(questionKey + "/answers")
      .push({
        text: answerText,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      });
  }
}

const store = new Store();

export default store;
