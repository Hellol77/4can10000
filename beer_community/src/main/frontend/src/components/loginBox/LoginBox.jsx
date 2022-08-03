import React, { useState } from "react";
import styles from "./loginBox.module.css";
import axios from 'axios';

const LoginBox = () => {
  const [loginState, setLoginState] = useState(true);
  const [emailList, setEmailList] = useState([]);
  const [message, setMessage] = useState('');
  const onClickLoginButton = (e) => {
    e.preventDefault();
    setLoginState(true);
  };
  const onClickSignUpButton = (e) => {
    e.preventDefault();
    axios.get('/api/join')
        .then((response) => {
                        console.log('response: ', response);
                        console.log('status: ', response.status); // 200
                        return response.data
                    })
                    .then(function (data) {
                        console.log('data: ', data)
                        setEmailList(data);
                    });
    setLoginState(false);
  };
  const onClickCheckDuplicate = (e) => {
    e.preventDefault();
    setMessage("사용가능한 이메일입니다!");
  }
  return (
    <div className={styles.main}>
      <div className={styles.loginBox}>
        <div className={styles.imgDiv}>
          <img src="/img/logo.png" alt="네캔만원" className={styles.loginImg} />
        </div>
        {loginState === true ? ( // 로그인 화면
          <>
            <form action="/login" method="POST">
              <button className={styles.Button} onClick={onClickSignUpButton}>
                회원가입
              </button>
              <button
                className={styles.onClickButton}
                onClick={onClickLoginButton}
              >
                로그인
              </button>
              <label className={styles.label}>이메일</label>
              <input type="email" className={styles.loginInput} name="email" />
              <label className={styles.label}>비밀번호</label>
              <input
                type="password"
                className={styles.passwordInput}
                name="password"
              />
              <button className={styles.submitButton} type="submit">
                로그인
              </button>
            </form>
            <div className={styles.loginAnother}>
              <div className={styles.loginAnotherLine}></div>
              <div className={styles.loginAnotherTitle}>
                다른 서비스로 로그인
              </div>
            </div>
            <div className={styles.loginAnotherButtonBox}>
              <a href="http://localhost:8080/oauth2/authorization/naver"
                className={[styles.loginAnotherButton, styles.naver].join(" ")}>
                {/* 라이브러리 classnames 설치해도 된다.*/}
              </a>

              <a href="http://localhost:8080/oauth2/authorization/google"

                className={[styles.loginAnotherButton, styles.google].join(" ")}>
              </a>
            </div>
          </>
        ) : (
          // 회원가입 화면
          <>
            <form action="/api/join" method="POST">
              <button
                className={styles.onClickButton}
                onClick={onClickSignUpButton}
              >
                회원가입
              </button>
              <button className={styles.Button} onClick={onClickLoginButton}>
                로그인
              </button>
              <div className={styles.emailCheckDiv}>
                <label className={styles.label}>이메일</label>
                <button className={styles.emailCheck} onClick={onClickCheckDuplicate} >중복검사</button>
              </div>
              <input type="email" className={styles.loginInput} name="email" />
              <label className={styles.label} styles="color: red;">{message}</label><br/><br/>
              <label className={styles.label}>닉네임</label>
              <input
                type="text"
                className={styles.loginInput}
                name="username"
              />
              <label className={styles.label}>비밀번호</label>
              <input
                type="password"
                className={styles.loginInput}
                name="password"
              />
              <label className={styles.label}>비밀번호 확인</label>
              <input
                type="password"
                className={styles.loginInput}
                name="passwordCheck"
              />
              <button className={styles.submitButton} type="submit">
                회원가입
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginBox;