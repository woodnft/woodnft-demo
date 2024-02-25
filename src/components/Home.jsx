import { useNavigate } from "react-router-dom";
import { useUser } from "./hooks/userContext";
import { useUserData } from "./hooks/customHooks";


const Home = () => {
  const { setUser } = useUser();
  const { data: users , isLoading } = useUserData();
  const navigate = useNavigate(); 

  console.log("users:", users);

  if (isLoading || !users) return <div>Loading...</div>;


  //選択できるユーザーのIDを入力
  const selectionIds = [ "1", "17", "18", "21", "25" ];
  
  const selectionUsers = [];
  selectionIds.forEach((i) => {
    selectionUsers.push(users.find(u => u.userId === i));
  });


  const handleUserClick = (selectedUser) => {
    setUser(selectedUser);
    navigate(`/mypage`);
  };


  const HomeStyle = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: '100vh', // 画面の高さを100vhに設定して、中央に配置
      paddingTop: '30vh',
      backgroundColor: '#111111', // 背景色は黒
      color: 'white', // 文字色は白
    },
    title: {
      textAlign: 'center', // タイトルを中央揃え
      marginBottom: '100px', // ユーザーボタンとの間隔
    },
    userButtonsContainer: {
      display: 'flex', // フレックスボックスでユーザーボタンを横並びに
      justifyContent: 'center', // 中央揃え
      gap: '50px', // ボタン間の間隔
    },
    userButton: {
      width: '100px', // ボタンのサイズを正方形に
      height: '100px',
      backgroundColor: 'grey', // ボタンの背景色
      color: 'white', // ボタンの文字色
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '5px', // ボタンの角を丸く
      border: '1px solid #ffffff',
      padding: '0px',
      overflow: 'hidden',
    },
    userInfo: {
      textAlign: 'center', // テキストを中央寄せ
      color: 'white', // テキストの色
    },
    userImage:{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    }
  };

  return (
    <div style={HomeStyle.container}>
      <h1 style={HomeStyle.title}>WOODNFT APP DEMO</h1>
      <div style={HomeStyle.userButtonsContainer}>
        {selectionUsers.map((u) => (
          <div onClick={()=>handleUserClick(u)}>
            <button style={HomeStyle.userButton}>
              <img src={"/woodnft-demo/user/"+u.profileUrl} alt={u.name} style={HomeStyle.userImage } />
            </button>
            <div style={HomeStyle.userInfo}>
              <div>{u.name}</div>
              <div>{u.location}</div>
              <div>{u.role}</div>
              <div>{u.occupation}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
    
};

export default Home;

