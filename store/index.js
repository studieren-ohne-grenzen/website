export const state = () => ({
  contentAccepted: false,
})

export const mutations = {
  accept(state) {
    state.contentAccepted = true
  },
}
