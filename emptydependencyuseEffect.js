/**
 * useEffect(() = {
 * 
 *  some code which is only used once to initialize
 * 
 * }, [])
 * 
 * with empty dependencies will get called when the GameScreen Component is first time added in the UI Interface i.e called
 * 
 * if it already there in the UI and some updation is done in the screen this empty useEffect Dependency won't get called
 * 
 */