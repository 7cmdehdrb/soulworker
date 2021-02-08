import React, { useState } from "react";
import {
  ImageBackground,
  Image,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Button } from "./Button";
import { OptionButton } from "./Options";
import Styles from "./Styles";
import { cFunction, getRandomInt } from "./utils";
import DB from "./db";
import Converter_BG from "./src/converter_patt2.png";
import Test_Image from "./src/weapon_image.png";
import Converter_Image from "./src/converter.png";

function Converter() {
  const [converterCnt, setConverterCnt] = useState(0);

  const [itemCode, setItemCode] = useState("vs_hr_wp");
  const item = DB[`${itemCode}`];

  const [opt0, setOpt0] = useState(1);
  const [opt1, setOpt1] = useState(2);
  const [opt2, setOpt2] = useState(3);
  const [opt3, setOpt3] = useState(item.available == 4 ? 4 : 0);

  const [val0, setVal0] = useState(
    getRandomInt(item.data[1][1], item.data[1][2])
  );
  const [val1, setVal1] = useState(
    getRandomInt(item.data[2][1], item.data[2][2])
  );
  const [val2, setVal2] = useState(
    getRandomInt(item.data[3][1], item.data[3][2])
  );
  const [val3, setVal3] = useState(
    item.available == 4 ? getRandomInt(item.data[4][1], item.data[4][2]) : 0
  );

  const [data, setData] = useState({
    a: 0,
    b: 0,
    c: 0,
    d: 0,
  });

  let opts = cFunction(
    item.data.length - 1,
    item.available,
    renewalException()
  );

  function ConverterAdd() {
    return data.a + data.b + data.c + data.d;
  }

  function renewalException() {
    let exceptionData = [];

    if (data.a == 1) {
      exceptionData.push(opt0);
    }
    if (data.b == 1) {
      exceptionData.push(opt1);
    }
    if (data.c == 1) {
      exceptionData.push(opt2);
    }
    if (data.d == 1) {
      exceptionData.push(opt3);
    }

    return exceptionData;
  }

  function startConverter() {
    const cct = ConverterAdd();

    if ((0 <= cct) & (cct <= 2)) {
      if (data.a == 0) {
        setOpt0(opts[0]);
        setVal0(getRandomInt(item.data[opts[0]][1], item.data[opts[0]][2]));
      }
      if (data.b == 0) {
        setOpt1(opts[1]);
        setVal1(getRandomInt(item.data[opts[1]][1], item.data[opts[1]][2]));
      }
      if (data.c == 0) {
        setOpt2(opts[2]);
        setVal2(getRandomInt(item.data[opts[2]][1], item.data[opts[2]][2]));
      }
      if (data.d == 0 && opt3) {
        setOpt3(opts[3]);
        setVal3(getRandomInt(item.data[opts[3]][1], item.data[opts[3]][2]));
      }

      // ====== //

      switch (cct) {
        case 0:
          setConverterCnt(converterCnt + 1); // 0옵 묶기 = +1
          break;
        case 1:
          setConverterCnt(converterCnt + 2); // 1옵 묶기 = +2
          break;
        case 2:
          setConverterCnt(converterCnt + 4); // 2옵 묶기 = +2
          break;
        default:
          break;
      }
    } else {
      // 뭔가 못하게 막는다
      alert("옵션 고정은 한번에 2개까지 가능합니다");
    }
  }

  return (
    <View style={Styles.Converter}>
      <View style={Styles.Converter_Container}>
        <View style={Styles.Converter_Item}>
          <View style={Styles.Converter_Image}>
            <ImageBackground source={Converter_BG} style={Styles.bgImage}>
              <Image source={Test_Image} style={Styles.Item_Image}></Image>
            </ImageBackground>
          </View>
          <View style={Styles.Converter_Name}>
            <Text style={Styles.orange_text}>페일 애쉬스 프레그먼트</Text>
          </View>
        </View>
        <View style={Styles.Converter_Option}>
          <View style={Styles.Converter_Part}>
            <View style={Styles.Converter_Part_Converter}>
              <Image
                source={Converter_Image}
                style={Styles.Converter_Part_Converter_Converter}
              ></Image>
              <View style={Styles.Converter_Part_Converter_Count}>
                <Text style={Styles.gray_text}>사용한 컨버터</Text>
                <Text style={Styles.orange_text}>{converterCnt}개</Text>
              </View>
            </View>
            <View style={Styles.Converter_Part_Fix}>
              <Button text="옵션정보 ▶"></Button>
              <Button text="장비변경 ▶"></Button>
            </View>
          </View>
          <View style={Styles.Option_Part}>
            <View style={Styles.Option_Head}>
              <Text style={Styles.Option_Head_Text}>변경 가능 옵션</Text>
            </View>
            <OptionButton
              id={"0"}
              opt={opt0}
              val={val0}
              code={itemCode}
              data={data}
              setData={setData}
            ></OptionButton>
            <OptionButton
              id={"1"}
              opt={opt1}
              val={val1}
              code={itemCode}
              data={data}
              setData={setData}
            ></OptionButton>
            <OptionButton
              id={"2"}
              opt={opt2}
              val={val2}
              code={itemCode}
              data={data}
              setData={setData}
            ></OptionButton>
            <OptionButton
              id={"3"}
              opt={opt3}
              val={val3}
              code={itemCode}
              data={data}
              setData={setData}
            ></OptionButton>
          </View>
          <View style={Styles.Start_Part}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={Styles.startbutton}
              onPress={() => {
                startConverter();
              }}
            >
              <Text style={Styles.starttext}>제련</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Converter;
