/** Ends the session and returns to the sign-in page. (No auth backend yet — add token cleanup here.) */
export const useSignOut = () => {
  const localePath = useLocalePath()
  return () => navigateTo(localePath('/sign-in'))
}
