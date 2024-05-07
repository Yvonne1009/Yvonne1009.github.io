import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth();

// 注册用户
const signUpWithEmailAndPassword = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // 注册成功，可以获取用户信息
      const user = userCredential.user;
      console.log("用户注册成功", user);
    })
    .catch((error) => {
      // 处理注册失败
      console.error("用户注册失败", error);
    });
};

// 登录用户
const signInWithEmailAndPassword = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // 登录成功，可以获取用户信息
      const user = userCredential.user;
      console.log("用户登录成功", user);
    })
    .catch((error) => {
      // 处理登录失败
      console.error("用户登录失败", error);
    });
};
