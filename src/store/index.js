import firebase from "../utils/firebase";
import { observable, computed } from "mobx";

const database = firebase.database();

class Store {
  @observable data = null;
  @observable hasLoaded = false;

  constructor() {
    database.ref().on("value", this.onFirebaseValue);
    // todo: off
  }

  onFirebaseValue = snapshot => {
    this.data = snapshot.val() || {}; // Empty db is null
    this.hasLoaded = true;
  };

  // Returns a firebase promise
  addNewQuestion(questionText) {
    return database
      .ref()
      .push()
      .set({
        question: {
          text: questionText,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }
      });
  }

  // Returns a firebase promise
  addNewAnswer(questionKey, answerText) {
    return firebase
      .database()
      .ref(questionKey + "/answers")
      .push({
        text: answerText,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      });
  }

  /**
   * Get the current threads sorted in chronological order by timestamp. The timestamp of a thread
   * is equal to the timestamp of the most recent question/answer within the thread.
   *
   * @readonly
   * @memberof Store
   * @returns {object[]} Returns the db contents as entries with timestamps in the form: [key,
   * value, timestamp]
   */
  @computed
  get sortedDataEntries() {
    if (!this.data) return this.data; // Handle empty db

    const entries = Object.entries(this.data);
    const entriesWithStamp = entries.map(([key, thread]) => {
      const answerTimes = thread.answers
        ? Object.values(thread.answers).map(answer => answer.timestamp)
        : [];

      return [key, thread, Math.max(thread.question.timestamp, ...answerTimes)];
    });
    entriesWithStamp.sort((a, b) => b[2] - a[2]);
    return entriesWithStamp;
  }
}

const store = new Store();

export default store;
