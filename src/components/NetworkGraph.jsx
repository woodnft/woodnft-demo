import React, { useState, useEffect, useRef } from 'react';
import TabNFT from './TabNFT';
import { useNFTData } from './hooks/customHooks';
import { DataSet, Network } from 'vis-network/standalone'; 
import { useNavigate } from 'react-router-dom';

const NetworkGraph = (props) => {
  const networkRef = useRef(null);
  const { data, isLoading } = useNFTData();
  const navigate = useNavigate();
  
  console.log("nftData:", data);

  const tokenId = !props.tokenId ? 1 : props.tokenId;
  console.log("tokenId:", tokenId);

  //ネットワークの設定
  useEffect(() => {

    const nodeSize = [25,40,100];
    //const nodeColor = [{background: 'white', border: 'yellow'}];
    //const edgeColor = ['lightskyblue','khaki','coral','springgreen'];

    const randomColors = [];
    for (let i = 0; i < 28; i++) {
      // 16進数で色を生成
      const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      randomColors.push(color);
    }


    // ノードとエッジのデータセットを作成
    const nodes = data.map(d => ({
      id: d.tokenId, 
      shape: 'image', image: "/woodnft-demo/wood-images/"+ d.tokenId +".png",
      label: 'ID:' + d.tokenId,
      size: d.productionMethod === "採取" ? nodeSize[1] : d.productionMethod === "集成材生産" ? nodeSize[2] : nodeSize[0],
      }
    ));

    const edges = []; 
    const floatingNodeIDs = [];


    data.forEach(d => {
      if (!d.parentId){
        floatingNodeIDs.push(d.tokenId);
        return;
      }

      const currentLabel = d.productionMethod;

      if (d.parentId.includes(',')){
        const parentIds = d.parentId.split(",");
        parentIds.forEach((p) => {
          edges.push({from:p, to:d.tokenId, color: randomColors[data[p-1]?.originalWoodId -1], label: currentLabel});
        });
      }else{
        edges.push({from: d.parentId, to: d.tokenId, color: randomColors[d.originalWoodId -1], label: currentLabel});
      }
      
    });

    //フォーカスしたいノード
    const nodeIdToFocus = parseInt(tokenId, 10);
    console.log("node to", nodeIdToFocus);

    // ネットワークの設定
    const networkData = { nodes, edges };
    const network = new Network(networkRef.current, networkData, options);

    network.once("initRedraw", () => {
      network.focus(nodeIdToFocus, {
        scale: 4.0,
      });
    });

    // ネットワークの初期化後、イベントリスナーを設定
    network.on("click", function (params) {
      // params.nodesには、クリックされたノードのIDの配列が含まれています。
      // クリックされたノードが1つもない場合は、空の配列になります。
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0]; // クリックされた最初のノードのID
        console.log("クリックされたノードのID:", nodeId);
        navigate("/CardDetailPage/"+nodeId);
      }
    });
      

    // ノードを滑らかに動かす関数
    function moveNodesSmoothlyWithDirectionChange(network, nodeIDs, duration) {
      const startTime = performance.now();
      let lastDirectionChangeTime = startTime; // 最後に方向を変えた時間
      const directionChangeInterval = 5000; // 方向を変える間隔（ミリ秒）
      let angle = Math.random() * Math.PI * 2; // 初期角度

      function animate(time) {
        const elapsedTime = time - startTime;
        if (elapsedTime > duration) return; // 指定時間が経過したら停止

        // 5秒ごとに方向を変更
        if (time - lastDirectionChangeTime > directionChangeInterval) {
          angle = Math.random() * Math.PI * 2; // 新しい角度
          lastDirectionChangeTime = time;
        }

        nodeIDs.forEach(nodeID => {
          const nodePosition = network.getPositions([nodeID])[nodeID];
          const stepSize = 10; // 1ステップのサイズ（ピクセル）

          // 新しい位置を計算
          const newPosition = {
            x: nodePosition.x + Math.cos(angle) * stepSize,
            y: nodePosition.y + Math.sin(angle) * stepSize,
          };

          // ノードの位置を更新
          network.moveNode(nodeID, newPosition.x, newPosition.y);
        });

        // 次のフレームで再度animateを呼び出す
        requestAnimationFrame(animate);
      }

      requestAnimationFrame(animate);
    }

    // ノードを滑らかに動かし始める
    //moveNodesSmoothlyWithDirectionChange(network, floatingNodeIDs, 20000); // 20秒間動かす
    }, [data, isLoading]);
    



    // グラフのオプション
    const options = {
      layout: {
        hierarchical: {
          enabled: false,
          levelSeparation: 150,
          nodeSpacing: 100,
          treeSpacing: 200,
          direction: 'UD', // 例: 上から下へ
          sortMethod: 'directed' // 'directed' or 'hubsize'
        }
      },
      physics: {
        enabled: true,
        barnesHut: {
          gravitationalConstant: -2000,
          centralGravity: 0.3,
          springLength: 95,
          springConstant: 0.04,
          damping: 0.09,
          avoidOverlap: 0
        },
        solver: 'barnesHut'
      },

      interaction: {
        zoomView: true, // ユーザーによるズームを許可
        dragView: true, // ユーザーによるビューのドラッグを許可
      },

      nodes: {
        font: {
          color: '#000000',
          size: 8
        }
      },
      edges: {
        width: 0.5,
        arrows: {
          to: {enabled: true, scaleFactor: 0.5}, // すべてのエッジに矢印を表示
        },
        font: {
          color: 'black', // ラベルのデフォルトの色
          size: 8, // ラベルのフォントサイズ
          strokeWidth: '0',
          // 他のフォントオプション...
        },
      },
      
    };


  const NetworkStyle = {
    height: "80vh",
    width: "100%",
    backgroundColor: "#dddddd"
  };

  return (
    <div>
      <TabNFT />
      <h1>系譜図</h1>
      <div ref={networkRef} style={NetworkStyle}></div>
    </div>
  );
};

export default NetworkGraph;


export const NetworkGraphHierarchical = (props) => {

  const networkRef = useRef(null);
  const { data, isLoading } = useNFTData();
  const navigate = useNavigate();
  
  console.log("nftData:", data);

  const tokenId = !props.tokenId ? 1 : props.tokenId;
  console.log("tokenId:", tokenId);

  //ネットワークの設定
  useEffect(() => {

    const nodeSize = [25,40,100];
    //const nodeColor = [{background: 'white', border: 'yellow'}];
    //const edgeColor = ['lightskyblue','khaki','coral','springgreen'];

    const randomColors = [];
    for (let i = 0; i < 28; i++) {
      // 16進数で色を生成
      const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      randomColors.push(color);
    }


    // ノードとエッジのデータセットを作成
    const nodes = new DataSet(
      data.map(d => ({
      id: d.tokenId, 
      shape: 'image', image: "/woodnft-demo/wood-images/"+ d.tokenId +".png",
      label: 'ID:' + d.tokenId,
      size: d.productionMethod === "採取" ? nodeSize[1] : d.productionMethod === "集成材生産" ? nodeSize[2] : nodeSize[0],
      fixed: {x: true, y: true},
      }))
    );

    const edges = []; 
    const floatingNodeIDs = [];


    data.forEach(d => {
      if (!d.parentId){
        floatingNodeIDs.push(d.tokenId);
        return;
      }

      const currentLabel = d.productionMethod;

      if (d.parentId.includes(',')){
        const parentIds = d.parentId.split(",");
        parentIds.forEach((p) => {
          edges.push({from:p, to:d.tokenId, color: randomColors[data[p-1]?.originalWoodId -1], label: currentLabel});
        });
      }else{
        edges.push({from: d.parentId, to: d.tokenId, color: randomColors[d.originalWoodId -1], label: currentLabel});
      }
      
    });

    //フォーカスしたいノード
    const nodeIdToFocus = parseInt(tokenId, 10);
    console.log("node to", nodeIdToFocus);

    // ネットワークの設定
    const networkData = { nodes, edges };
    const network = new Network(networkRef.current, networkData, options);

    network.once("initRedraw", () => {
      network.focus(nodeIdToFocus, {
        scale: 4.0,
      });
    });

    // クリックされたらカードを変更し、ビューも移動させる
    network.on("click", function (params) {
      if (params.nodes.length > 0) {
        const clickedNodeId = params.nodes[0]; // クリックされた最初のノードのID
        console.log("クリックされたノードのID:", clickedNodeId);
        navigate("/CardDetailPage/"+clickedNodeId);

        network.focus(clickedNodeId, {
          animation: { // アニメーション設定（オプション）
            duration: 1000, // アニメーションの時間（ミリ秒）
            easingFunction: "easeInOutQuad"
          }
        });

        //クリックしたトークンの関係ノードを横に並べる
        if(data[clickedNodeId]?.productionMethod === "切り出し"){
          const clickedNodePosition = network.getPositions([clickedNodeId])[clickedNodeId];
          // 親（原木）を探し、Y座標を更新
          const connectedNodeId = data[clickedNodeId]?.parentId;
          const connectedNodePosition = network.getPositions([connectedNodeId])[connectedNodeId];
          network.moveNode(connectedNodeId, connectedNodePosition.x, clickedNodePosition.y);
        } else if (data[clickedNodeId]?.productionMethod === "ラミナ加工"){
          const clickedNodePosition = network.getPositions([clickedNodeId])[clickedNodeId];
          //子（集成材）を探し、Y座標を更新
          const connectedNodeId = data.find(d =>
            d.chimeraId === data[clickedNodeId]?.chimeraId.split('-')[0]
          ).tokenId;
          const connectedNodePosition = network.getPositions([connectedNodeId])[connectedNodeId];
          network.moveNode(connectedNodeId, connectedNodePosition.x, clickedNodePosition.y);
        }

      }
    });
      

    }, [data, isLoading]);
    



    // グラフのオプション
    const options = {
      layout: {
        hierarchical: {
          enabled: true,
          levelSeparation: 150,
          nodeSpacing: 100,
          treeSpacing: 200,
          direction: 'LR', // 例: 上から下へ
          sortMethod: 'directed' // 'directed' or 'hubsize'
        }
      },
      physics: {
        enabled: false,
        barnesHut: {
          gravitationalConstant: -2000,
          centralGravity: 0.3,
          springLength: 95,
          springConstant: 0.04,
          damping: 0.09,
          avoidOverlap: 0
        },
        solver: 'barnesHut'
      },

      interaction: {
        zoomView: true, // ユーザーによるズームを許可
        dragView: true, // ユーザーによるビューのドラッグを許可
      },

      nodes: {
        font: {
          color: '#000000',
          size: 8
        }
      },
      edges: {
        width: 0.5,
        arrows: {
          to: {enabled: true, scaleFactor: 0.5}, // すべてのエッジに矢印を表示
        },
        font: {
          color: 'black', // ラベルのデフォルトの色
          size: 8, // ラベルのフォントサイズ
          strokeWidth: 0,
          // 他のフォントオプション...
        },
      },
      
    };


  const NetworkStyle = {
    height: "80vh",
    width: "100%",
    backgroundColor: "#dddddd"
  };

  return (
    <div>
      <TabNFT />
      <h1>系譜図</h1>
      <div ref={networkRef} style={NetworkStyle}></div>
    </div>
  );
};