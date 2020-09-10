export const ADD_ROAD = "ADD_ROAD";
export const FETCH_ROADS = "FETCH_ROADS";

export const fetchRoads = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const responce = await fetch(
      "http://192.168.42.93:8000/api/roads",
      {
        method: "GET",
        headers: {
          Authorization: "Token " + token.toString(),
        },
      }
    );

    if (!responce.ok) {
      throw new Error("Something went wrong");
    }
    const resData = await responce.json();
    let roads = [];
    for (const road in resData) {
      const data = {
        id: resData[road].id.toString(),
        roadName: resData[road].road_name,
        roadCondition: resData[road].road_condition,
        imageUri: resData[road].image,
        lat: resData[road].latitude,
        lng: resData[road].longitude,
        predictedImage: resData[road].predictedImage,
        createdAt: resData[road].created_at,
        status: resData[road].status,
      };
      roads.push(data);
    }
    dispatch({ type: FETCH_ROADS, payload: roads });
  };
};

export const addRoad = (
  roadName,
  roadCondition,
  imageUri,
  location,
  isRealTime
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const username = getState().auth.username;
    let body = new FormData();
    body.append("image", {
      uri: imageUri,
      type: "image/jpg",
      name: username.toString() + "_" + new Date().toISOString() + ".jpg",
    });
    body.append("road_name", roadName);
    body.append("road_condition", roadCondition);
    body.append("latitude", location.lat);
    body.append("longitude", location.lng);
    body.append("isRealTime", isRealTime);
    const responce = await fetch(
      "http://192.168.42.93/api/roads/",
      {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Token " + token.toString(),
        },
        body: body,
      }
    );
    if (!responce.ok) {
      throw new Error("Something Went Wrong");
    }

    // const resData = responce.json();
    // const data = {
    //   id: resData.id,
    //   roadName: resData,
    //   roadCondition: resData.road_condition,
    //   imageUri: resData.image,
    //   lat: resData.latitude,
    //   lng: resData.longitude,
    //   predictedImage: resData.predictedImage,
    //   createdAt: resData.created_at,
    // };
    dispatch({ type: ADD_ROAD, payload: null });
  };
};
