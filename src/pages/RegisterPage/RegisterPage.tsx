import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./RegisterPage.module.css";
import { useCallback, FormEventHandler, useEffect } from "react";
import { fetchRegister } from "../../services/slices/auth";
import { useNavigate } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { cachedAuthData } from "../../utils/data";
import { useForm } from "../../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RootState } from "../../services/store";

const RegisterPage = () => {
  const { form, onChange } = useForm(cachedAuthData);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getStoreData = (state: RootState) => ({
    authSuccess: state?.auth?.success,
    authErrorMessage: state?.auth?.errorMessage,
    authenticated: Boolean(state?.auth?.user?.name),
  });
  const { authSuccess, authErrorMessage, authenticated } =
    useAppSelector(getStoreData);

  useEffect(() => {
    authenticated && navigate(-1);
  }, []);

  useEffect(() => {
    authSuccess && navigate("/");
  }, [authSuccess]);

  const submit: FormEventHandler = useCallback(
    (event: React.SyntheticEvent<Element, Event>) => {
      event.preventDefault();
      dispatch(
        fetchRegister({
          email: String(form.email),
          password: String(form.password),
          name: String(form.name),
        })
      );
    },
    [form]
  );

  return (
    <div className={styles.container}>
      {authErrorMessage ? (
        <div className="text text_type_main-default">
          {<>authErrorMessage</>}
        </div>
      ) : (
        <>
          <form className={styles.form}>
            <p className="text text_type_main-default">Регистрация</p>
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={onChange}
              value={String(form.name)}
              name={"name"}
            />

            <EmailInput
              placeholder={"E-mail"}
              onChange={onChange}
              value={String(form.email)}
              name={"email"}
            />

            <PasswordInput
              placeholder={"Пароль"}
              value={String(form.password)}
              name="password"
              onChange={onChange}
            />
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={submit}
            >
              Зарегистрироваться
            </Button>
          </form>
          <div className="pt-10 text text_type_main-small text_color_inactive">
            Ужу зарегистрированы?
            <Button
              htmlType="button"
              type="secondary"
              size="small"
              onClick={(e) => navigate("/login")}
              extraClass="p-2"
            >
              Нажми на меня
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default RegisterPage;
