// Essentially, reducers should be syncronous, pure functions (no side effects),
// but middleware allows you to handle asyncronous actions and global state
// modifications by intercepting all actions before they reach the reducers
// and allowing you to control their flow with next(action),
// modify the actions before passing them along, and dispatch other actions

export default store => next => action => {

  // do something with the action
  // The example here is syncronous, but you could also deffer returning
  // next(action) until a promise resolves if you had an async opperation
  console.group(action.type)
  console.info('dispatching', action)
  console.groupEnd()

  // pass it along to the next middleware
  // or reducer if it's the last in the chain
  return next(action)

}

// Great intro to redux middleware here:
// https://www.codementor.io/vkarpov/beginner-s-guide-to-redux-middleware-du107uyud

// More complex example of a middleware that interacts with an API:
// https://codesandbox.io/s/github/reduxjs/redux/tree/master/examples/real-world
