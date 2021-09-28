import { TRANSPARENT } from "../constants/colors";
import { NUNITO_BOLD } from "../constants/fonts";

export const globalStyles = {
  heading: {
    fontSize: 22,
    color: "white",
    textTransform: "uppercase",
    fontFamily: NUNITO_BOLD,
  },
  loginContainer: {
    backgroundColor: TRANSPARENT,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    flex: 1,
    alignSelf: "center",
    marginTop: 10,
    paddingBottom: 30,
    paddingTop: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputField: {
    flex: 1,
    marginHorizontal: 10,
    color: "white",
  },
};
