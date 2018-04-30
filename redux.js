import { createStore, combineReducers } from "redux";

//today's date
const today = new Date();

// today.setMonth(0);
today.setFullYear(2019);

// console.log(today.getFullYear());

//month names
const months = [
  {
    id: 0,
    name: "january",
    days: 31
  },
  {
    id: 1,
    name: "february",
    days: today.getFullYear() % 4 === 0 ? 29 : 28
  },
  {
    id: 2,
    name: "march",
    days: 31
  },
  {
    id: 3,
    name: "april",
    days: 30
  },
  {
    id: 4,
    name: "may",
    days: 31
  },
  {
    id: 5,
    name: "june",
    days: 30
  },
  {
    id: 6,
    name: "july",
    days: 31
  },
  {
    id: 7,
    name: "august",
    days: 31
  },
  {
    id: 8,
    name: "september",
    days: 30
  },
  {
    id: 9,
    name: "october",
    days: 31
  },
  {
    id: 10,
    name: "november",
    days: 30
  },
  {
    id: 11,
    name: "december",
    days: 31
  }
];

const Days = [
  { name: "monday", short: "M" },
  { name: "tuesday", short: "T" },
  { name: "wednesday", short: "W" },
  { name: "thursday", short: "T" },
  { name: "friday", short: "F" },
  { name: "saturday", short: "S" },
  { name: "sunday", short: "S" }
];

//default state of the monthreducer
const monthDefaultState = {
  previousMonth:
    today.getMonth() === 0 ? months[11] : months[today.getMonth() - 1],
  currentMonth: months[today.getMonth()],
  nextMonth: today.getMonth() === 11 ? months[0] : months[today.getMonth() + 1],
  year: today.getFullYear()
};

const dayDefaultState = {};

const monthSelector = (state, month) => ({
  previousMonth: month === 0 ? months[11] : months[month - 1],
  currentMonth: months[month],
  nextMonth: month === 11 ? months[0] : months[month + 1]
});

const monthReducer = (state = monthDefaultState, action) => {
  switch (action.type) {
    case "SET_CURRENT_MONTH":
      return Object.assign({}, state, monthSelector(state, action.month));

    case "SET_MONTH":
      return Object.assign({}, state, monthSelector(state, action.month));

    default:
      return state;
  }
};

const setMonth = month => ({
  type: "SET_MONTH",
  month
});

const setCurrentMonth = () => ({
  type: "SET_CURRENT_MONTH",
  month: new Date().getMonth()
});

//days
const dayReducer = (state = {}, action) => {
  console.log(action.today);
  switch (action.type) {
    case "GET_CURRENT_DAY":
      return Object.assign({}, state, { day: Days[action.today] });
    default:
      return state;
  }
};

const getCurrentDay = () => ({
  type: "GET_CURRENT_DAY",
  today: new Date().getDay() - 1
});

const store = createStore(
  combineReducers({ month: monthReducer, day: dayReducer })
);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});
// unsubscribe();

// store.dispatch(setCurrentMonth());

// store.dispatch(setMonth(0));
store.dispatch(getCurrentDay());

const data = store.getState();

// console.log(data.currentMonth)
