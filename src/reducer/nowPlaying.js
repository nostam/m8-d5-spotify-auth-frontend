export default function nowPlay(state = {}, action) {
  switch (action.type) {
    case "PLAY":
      return action.payload;
    default:
      return state;
  }
}
