import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import type { RouteProp } from "@react-navigation/native";
// Above import is for any screens receiving route params

// Tab 2
export type GuestsStackNavigatorParamList = {
  // Route name without any parameters being passed: Specified with undefined
  Browse: undefined;
  Guestlist: undefined;
};

// Tab 1
export type PartiesStackNavigatorParamList = {
  Invited: undefined;
  Confirmed: undefined;
};

export type ProfileStackNavigatorParamList = {
  // Route name without any parameters being passed: Specified with undefined
  Profile: undefined;
};

export type IntroStackNavigatorParamList = {
  // Route name without any parameters being passed: Specified with undefined
  Login: undefined;
  SignUp: undefined;
};

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  IntroStackNavigatorParamList,
  "SignUp"
>;

export type SignUpScreenNavigationProp = NativeStackNavigationProp<
  IntroStackNavigatorParamList,
  "Login"
>;

// Navigation within "Guests" Tab
export type BrowseScreenNavigationProp = NativeStackNavigationProp<
  GuestsStackNavigatorParamList,
  "Guestlist"
>;

export type GuestlistScreenNavigationProp = NativeStackNavigationProp<
  GuestsStackNavigatorParamList,
  "Browse"
>;

// Navigation within "Parties" Tab
export type InvitedScreenNavigationProp = NativeStackNavigationProp<
  PartiesStackNavigatorParamList,
  "Confirmed"
>;

export type ConfirmedScreenNavigationProp = NativeStackNavigationProp<
  PartiesStackNavigatorParamList,
  "Invited"
>;

// Tab 3
export type BottomTabNavigatorParamList = {
  Guests: GuestsStackNavigatorParamList;
  Parties: PartiesStackNavigatorParamList;
  ProfileScreen: undefined;
};

export type AuthContextData = {
  authData?: AuthContextData;
  loading: boolean;
  signIn(): Promise<void>;
  signOut(): void;
};

export type AuthData = {
  token: string;
  email: string;
  name: string;
};
