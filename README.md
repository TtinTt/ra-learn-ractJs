#### 1. Cài đặt các thư viện

##### 1.1. React Bootstrap

```
npm install bootstrap react-bootstrap
```

##### 1.2. Redux

```
npm install redux react-redux
```

##### 1.3. Redux Toolkit

```
npm install @reduxjs/toolkit
```

##### 1.4. Axios (thư viện hỗ trợ gọi API)

```
npm install axios
```

##### 1.5. React Router

```
npm install react-router-dom
```

#### 2. Cấu hình các thư viện

##### 2.1. React bootstrap

<!-- /* import CSS vào file App.js hoặc index.js */ -->

```
import 'bootstrap/dist/css/bootstrap.min.css'
```

##### 2.2. React router

import BrowserRouter và bao thẻ App ở file `index.js`

<!-- - Import BrowserRouter trong file `index.js`
- Định nghĩa các routes ở `App.js` -->

##### 2.3. React redux toolkit

- Tạo reducers
- Tạo store
- Tạo actions
- import `Provider` và set thuộc tính `store` - bao thẻ App
