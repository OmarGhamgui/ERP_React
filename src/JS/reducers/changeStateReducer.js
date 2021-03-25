
const initialState = {
  sidebarShow: 'responsive'
}

const changeStateReducer = (state = initialState, { type}) => {
  switch (type) {
    case 'set':
      return {...state,
        sidebarShow:!state.sidebarShow
      }
    default:
      return state
  }
}

export default changeStateReducer;