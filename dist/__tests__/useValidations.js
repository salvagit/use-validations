import { renderHook, act } from "@testing-library/react";
import useValidations from "../useValidations";
const FAKE_USER = {
    email: "jconnor@skynet.com",
    password: "easy-money",
};
const FAKE_DEFAULT_DATA = {
    email: "",
    password: "",
};
const FAKE_VALIDATORS = {
    email: (value) => (value === "" ? "required" : null),
    password: (value) => (value === "" ? "required" : null),
};
describe("test useValidation custom hook", () => {
    test("basic validation", () => {
        const { result } = renderHook(() => useValidations({ defaultData: FAKE_DEFAULT_DATA, validators: FAKE_VALIDATORS }));
        act(() => result.current.handleInputChange("email")(FAKE_USER.email));
        act(() => result.current.handleInputChange("password")(FAKE_USER.password));
        expect(result.current.hasErrors).toBe(false);
    });
    test("relative validation", () => {
        const PASSWORD_NOT_MATCH = "password not match";
        const defaultData = Object.assign(Object.assign({}, FAKE_DEFAULT_DATA), { confirm_password: "" });
        const validators = Object.assign(Object.assign({}, FAKE_VALIDATORS), { confirm_password: (value, storedData) => value !== (storedData === null || storedData === void 0 ? void 0 : storedData.password) ? PASSWORD_NOT_MATCH : null });
        const { result } = renderHook(() => useValidations({ defaultData, validators }));
        act(() => result.current.handleInputChange("email")(FAKE_USER.email));
        act(() => result.current.handleInputChange("password")(FAKE_USER.password));
        act(() => result.current.handleInputChange("confirm_password")("MISMATCH_PASSWORD"));
        expect(result.current.hasErrors).toBe(true);
        expect(result.current.errors.confirm_password).toBe(PASSWORD_NOT_MATCH);
        act(() => result.current.handleInputChange("confirm_password")(FAKE_USER.password));
        expect(result.current.hasErrors).toBe(false);
    });
});
//# sourceMappingURL=useValidations.js.map