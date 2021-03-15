export class LocalStorage {
  loadState = () => {
    try {
      const serializedState = localStorage.getItem("user");
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };

  saveState = (state: any) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("user", serializedState);
    } catch (err) {
      // ignore
      console.log(err);
    }
  };
}
