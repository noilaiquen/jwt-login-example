import { AsyncStorage } from "react-native"

const setAuthState = async info => {
   try {
      await AsyncStorage.setItem('@AuthState', JSON.stringify(info));
   } catch (error) {
      throw new Error(error);
   }
}

const getAuthState = async () => {
   try {
      const value = await AsyncStorage.getItem('@AuthState');
      if (value !== null) {
         return JSON.parse(value);
      } 
      return null;
   } catch (error) {
      throw new Error(error);
   }
}

const removeAuthState = async () => {
   await AsyncStorage.removeItem('@AuthState');
}

export {
   setAuthState,
   getAuthState,
   removeAuthState
};
