import { useNavigate } from "react-router-dom";
import { useUser } from "./hooks/userContext";
import { useUserData } from "./hooks/customHooks";
import { Button, Typography } from "@mui/material";
import Wood3D from "./Wood3D";
import styled from "@emotion/styled";
import '@fontsource/roboto/500.css';


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

  const ProjectButton = styled(Button)`
    color: white;
  `;


  const HomeStyle = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: '100vh', // 画面の高さを100vhに設定して、中央に配置
      backgroundColor: '#55555d', // 背景色は黒
      color: 'white', // 文字色は白,
      overflow: 'clip'
    },
    title: {
      textAlign: 'center', // タイトルを中央揃え
      marginBottom: '80px', // ユーザーボタンとの間隔
      width: '100vw',
    },
    userButtonsContainer: {
      display: 'flex', // フレックスボックスでユーザーボタンを横並びに
      //flexDirection: 'column',
      justifyContent: 'center', // 中央揃え
      alignItems: 'flex-start', // 中央揃え
      gap: '30px', // ボタン間の間隔
      width: '100%',
      flexWrap: 'wrap',
    },
    userButton: {
      width: '120px',
      height: '120px', // 役割テキストの分だけ高さを調整
      backgroundColor: 'grey',
      color: 'white',
      //display: 'flex',
      //flexDirection: 'column', // 子要素を縦に並べる
      //justifyContent: 'center',
      //alignItems: 'center',
      borderRadius: '5px',
      border: '1.5px solid #ffffff',
      padding: '0px',
      overflow: 'hidden',
      marginBottom: '10px', // ボタン間のマージン調整
    },
    userInfo: {
      textAlign: 'center', // テキストを中央寄せ
      color: 'white', // テキストの色
    },
    userImage:{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    flexUsers: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -55%)',
      color: 'white',
      zIndex: 1,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    imageAndCaption: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    }
  };

  return (

    <div style={HomeStyle.container}>
      <div style={{ position: 'relative', width:"100%", height:"100%", marginTop:'5%'}}>
        <Wood3D />
      </div>

      <div style={HomeStyle.flexUsers}>
        <h1 style={HomeStyle.title}>WOODNFT APP DEMO</h1>

        <div style={HomeStyle.userButtonsContainer}>
          {selectionUsers.map((u, index) => (
            <div style={HomeStyle.imageAndCaption}>
              <button style={HomeStyle.userButton} onClick={() => handleUserClick(u) }>
                <img src={"/woodnft-demo/user/"+"user"+index+".png" } alt={u.name} style={HomeStyle.userImage } />
              </button>

              <div style={{textAlign: "center", marginTop:'10px', fontWeight:'bold', width:'140px'}}>{u.role}</div>

            </div>
          ))}
          <div style={{ width: '140px', textAlign:'center' }}>
            <Button style={{ ...HomeStyle.userButton, backgroundColor: 'rgba(50,50,50,0.5)', }} onClick={()=>navigate(`/project`)}>
              <Typography variant="button" display="block" >
                What <br></br> is <br></br> WOODNFT <br></br>
              </Typography>
            </Button>
          </div>
          
          
          </div>
      </div>
    </div>
  )
    
};

export default Home;

