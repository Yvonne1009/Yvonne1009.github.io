filterSelection("all");
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

// Get the modals and close buttons for each image
var modal1 = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");
var modal3 = document.getElementById("myModal3");
var modal4 = document.getElementById("myModal4");
var modal5 = document.getElementById("myModal5");
var modal6 = document.getElementById("myModal6");
var modal7 = document.getElementById("myModal7");
var modal8 = document.getElementById("myModal8");
var modal9 = document.getElementById("myModal9");
var modal10 = document.getElementById("myModal10");
var modal11 = document.getElementById("myModal11");
var modal12 = document.getElementById("myModal12");
var modal13 = document.getElementById("myModal13");
var modal14 = document.getElementById("myModal14");
var modal15 = document.getElementById("myModal15");
var modal16 = document.getElementById("myModal16");
var modal17 = document.getElementById("myModal17");
var modal18 = document.getElementById("myModal18");
var modal19 = document.getElementById("myModal19");
var modal20 = document.getElementById("myModal20");
var modal21 = document.getElementById("myModal21");
var modal22 = document.getElementById("myModal22");
var modal23 = document.getElementById("myModal23");
var modal24 = document.getElementById("myModal24");
var modal25 = document.getElementById("myModal25");
var modal26 = document.getElementById("myModal26");
var modal27 = document.getElementById("myModal27");
var modal28 = document.getElementById("myModal28");
var modal29 = document.getElementById("myModal29");
var modal30 = document.getElementById("myModal30");
var modal31 = document.getElementById("myModal31");
var modal32 = document.getElementById("myModal32");
var modal33 = document.getElementById("myModal33");
var modal34 = document.getElementById("myModal34");
var modal35 = document.getElementById("myModal35");
var modal36 = document.getElementById("myModal36");
var modal37 = document.getElementById("myModal37");
var modal38 = document.getElementById("myModal38");
var modal39 = document.getElementById("myModal39");
var modal40 = document.getElementById("myModal40");
var modal41 = document.getElementById("myModal41");
var modal42 = document.getElementById("myModal42");
var modal43 = document.getElementById("myModal43");
var modal44 = document.getElementById("myModal44");
var modal45 = document.getElementById("myModal45");
var modal46 = document.getElementById("myModal46");
var modal47 = document.getElementById("myModal47");
var modal48 = document.getElementById("myModal48");
var modal49 = document.getElementById("myModal49");
var modal50 = document.getElementById("myModal50");
var modal51 = document.getElementById("myModal51");
var modal52 = document.getElementById("myModal52");
var modal53 = document.getElementById("myModal53");
var modal54 = document.getElementById("myModal54");
var modal55 = document.getElementById("myModal55");
var modal56 = document.getElementById("myModal56");
var modal57 = document.getElementById("myModal57");
var modal58 = document.getElementById("myModal58");
var modal59 = document.getElementById("myModal59");
var modal60 = document.getElementById("myModal60");
var modal61 = document.getElementById("myModal61");
var modal62 = document.getElementById("myModal62");
var modal63 = document.getElementById("myModal63");
var modal64 = document.getElementById("myModal64");
var modal65 = document.getElementById("myModal65");
var modal66 = document.getElementById("myModal66");
var modal67 = document.getElementById("myModal67");
var modal68 = document.getElementById("myModal68");
var modal69 = document.getElementById("myModal69");
var modal70 = document.getElementById("myModal70");
var modal71 = document.getElementById("myModal71");
var modal72 = document.getElementById("myModal72");
var modal73 = document.getElementById("myModal73");
var modal74 = document.getElementById("myModal74");
var modal75 = document.getElementById("myModal75");
var modal76 = document.getElementById("myModal76");
var modal77 = document.getElementById("myModal77");
var modal78 = document.getElementById("myModal78");
var modal79 = document.getElementById("myModal79");
var modal80 = document.getElementById("myModal80");
var modal81 = document.getElementById("myModal81");
var modal82 = document.getElementById("myModal82");
var modal83 = document.getElementById("myModal83");
var modal84 = document.getElementById("myModal84");
var modal85 = document.getElementById("myModal85");
var modal86 = document.getElementById("myModal86");
var modal87 = document.getElementById("myModal87");
var modal88 = document.getElementById("myModal88");
var modal89 = document.getElementById("myModal89");
var modal90 = document.getElementById("myModal90");
var modal91 = document.getElementById("myModal91");
var modal92 = document.getElementById("myModal92");
var modal93 = document.getElementById("myModal93");
var modal94 = document.getElementById("myModal94");
var modal95 = document.getElementById("myModal95");
var modal96 = document.getElementById("myModal96");
var modal97 = document.getElementById("myModal97");
var modal98 = document.getElementById("myModal98");
var modal99 = document.getElementById("myModal99");
var modal100 = document.getElementById("myModal100");
var modal101 = document.getElementById("myModal101");
var modal102 = document.getElementById("myModal102");
var modal103 = document.getElementById("myModal103");
var modal104 = document.getElementById("myModal104");
var modal105 = document.getElementById("myModal105");
var modal106 = document.getElementById("myModal106");
var modal107 = document.getElementById("myModal107");
var modal108 = document.getElementById("myModal108");
var modal109 = document.getElementById("myModal109");
var modal110 = document.getElementById("myModal110");
var modal111 = document.getElementById("myModal111");
var modal112 = document.getElementById("myModal112");
var modal113 = document.getElementById("myModal113");
var modal114 = document.getElementById("myModal114");
var modal115 = document.getElementById("myModal115");
var modal116 = document.getElementById("myModal116");
var modal117 = document.getElementById("myModal117");
var modal118 = document.getElementById("myModal118");
var modal119 = document.getElementById("myModal119");
var modal120 = document.getElementById("myModal120");
var modal121 = document.getElementById("myModal121");
var modal122 = document.getElementById("myModal122");
var modal123 = document.getElementById("myModal123");
var modal124 = document.getElementById("myModal124");
var modal125 = document.getElementById("myModal125");
var modal126 = document.getElementById("myModal126");
var modal127 = document.getElementById("myModal127");
var modal128 = document.getElementById("myModal128");
var modal129 = document.getElementById("myModal129");
var modal130 = document.getElementById("myModal130");
var modal131 = document.getElementById("myModal131");
var modal132 = document.getElementById("myModal132");
var modal133 = document.getElementById("myModal133");

var img1 = document.getElementById("ImpressionSunrise");
var img2 = document.getElementById("TheWaterLilyPond");
var img3 = document.getElementById("AFarmyardinNormandy");
var img4 = document.getElementById("Angler");
var img5 = document.getElementById("WaterLiliesEveningEffect");
var img6 = document.getElementById("Chrysanthemums");
var img7 = document.getElementById("FruitBasketwithApplesandGrapes");
var img8 = document.getElementById("GardenatSainteAdresse");
var img9 = document.getElementById("WaterlooBridgeGrayWeather");
var img10 = document.getElementById("TheBridgeAmsterdam");
var img11 = document.getElementById("IntheGarden");
var img12 = document.getElementById("JeanneMargueriteLecadreintheGarden");
var img13 = document.getElementById("TheBoatStudio");
var img14 = document.getElementById("TheChapelNotreDamedeGraceatHonfleur");
var img15 = document.getElementById("Juechen");
var img16 = document.getElementById("Iceandsnow");
var img17 = document.getElementById("Searching");
var img18 = document.getElementById("Fieldfragrance");
var img19 = document.getElementById("It’scoldathighplaces");
var img20 = document.getElementById("dreamofmortalworld");
var img21 = document.getElementById(
  "TheChurchatVarengevilleandtheGorgeofLesMoutiers"
);
var img22 = document.getElementById("TheGarden");
var img23 = document.getElementById("TheLuncheon");
var img24 = document.getElementById("WindmillsnearZaandam");
var img25 = document.getElementById("BargesontheSeine");
var img26 = document.getElementById("BouquetsofFlowers");
var img27 = document.getElementById("FieldofBananaTrees");
var img28 = document.getElementById("ForestPath");
var img29 = document.getElementById("HouseandFigureamongtheTrees");
var img30 = document.getElementById("LandscapenearPontAven");
var img31 = document.getElementById("Roses");
var img32 = document.getElementById("TheLaundress");
var img33 = document.getElementById("TheRoseGardenatWargemont");
var img34 = document.getElementById("TheSeineatAsnieres");
var img35 = document.getElementById("VaseBasketofFlowersandFruit");
var img36 = document.getElementById("LaGrenouillere");
var img37 = document.getElementById("Bathing");
var img38 = document.getElementById("Beachgameandrescue");
var img39 = document.getElementById("CafeRoyan");
var img40 = document.getElementById("Fairground");
var img41 = document.getElementById("Harlequinfamily");
var img42 = document.getElementById("Housesonthehill");
var img43 = document.getElementById("Plasterheadandarm");
var img44 = document.getElementById("RecliningWoman");
var img45 = document.getElementById("SquareduVertGalant");
var img46 = document.getElementById("Stilllife");
var img47 = document.getElementById("Studio");
var img48 = document.getElementById("TheKiss");
var img49 = document.getElementById("Thesculptor");
var img50 = document.getElementById("Guernica");
var img51 = document.getElementById("kaohsiungsunset3");
var img52 = document.getElementById("kaohsiunglighthouse");
var img53 = document.getElementById("kaohsiunglighthouse1");
var img54 = document.getElementById("kaohsiunglighthouse2");
var img55 = document.getElementById("kaohsiunglighthouse3");
var img56 = document.getElementById("Kentingseaview");
var img57 = document.getElementById("DragonGateSecretRealm");
var img58 = document.getElementById("Woodfireseries");
var img59 = document.getElementById("GroundGoldenLotus");
var img60 = document.getElementById("GuishanIsland");
var img61 = document.getElementById("Oneleafknowsautumn");
var img62 = document.getElementById("Renzhiguansketching");
var img63 = document.getElementById("Fieldfragrance(blackandwhite)");
var img64 = document.getElementById("coldmoonlight");
var img65 = document.getElementById("acrossthedust");
var img66 = document.getElementById("flytothepeak");
var img67 = document.getElementById("SongoftheMoonWorld");
var img68 = document.getElementById("splendidlandscape");
var img69 = document.getElementById("lulu1");
var img70 = document.getElementById("rabbit1");
var img71 = document.getElementById("rabbit2");
var img72 = document.getElementById("Calcifer");
var img73 = document.getElementById("LiYinshouse");
var img74 = document.getElementById("cat1");
var img75 = document.getElementById("cat2");
var img76 = document.getElementById("cat3");
var img77 = document.getElementById("cat4");
var img78 = document.getElementById("Snoopy1");
var img79 = document.getElementById("Snoopy2");
var img80 = document.getElementById("Snoopy3");
var img81 = document.getElementById("Snoopy4");
var img82 = document.getElementById("Dinosaur1");
var img83 = document.getElementById("Dinosaur2");
var img84 = document.getElementById("Dinosaur3");
var img85 = document.getElementById("Dinosaur4");
var img86 = document.getElementById("Dinosaur5");
var img87 = document.getElementById("stroller1");
var img88 = document.getElementById("Puddingdog");
var img89 = document.getElementById("Bear1");
var img90 = document.getElementById("Bear2");
var img91 = document.getElementById("AdventureTime");
var img92 = document.getElementById("Bear3");
var img93 = document.getElementById("rabbit3");
var img94 = document.getElementById("lulu2");
var img95 = document.getElementById("lulu3");
var img96 = document.getElementById("bus");
var img97 = document.getElementById("attackontitan");
var img98 = document.getElementById("Gundam");
var img99 = document.getElementById("spy");
var img100 = document.getElementById("sharkcat");
var img101 = document.getElementById("img101");
var img102 = document.getElementById("img102");
var img103 = document.getElementById("img103");
var img104 = document.getElementById("img104");
var img105 = document.getElementById("img105");
var img106 = document.getElementById("img106");
var img107 = document.getElementById("img107");
var img108 = document.getElementById("img108");
var img109 = document.getElementById("img109");
var img110 = document.getElementById("img110");
var img111 = document.getElementById("img111");
var img112 = document.getElementById("img112");
var img113 = document.getElementById("img113");
var img114 = document.getElementById("img114");
var img115 = document.getElementById("img115");
var img116 = document.getElementById("img116");
var img117 = document.getElementById("img117");
var img118 = document.getElementById("img118");
var img119 = document.getElementById("img119");
var img120 = document.getElementById("img120");
var img121 = document.getElementById("img121");
var img122 = document.getElementById("img122");
var img123 = document.getElementById("img123");
var img124 = document.getElementById("img124");
var img125 = document.getElementById("img125");
var img126 = document.getElementById("img126");
var img127 = document.getElementById("img127");
var img128 = document.getElementById("img128");
var img129 = document.getElementById("img129");
var img130 = document.getElementById("img130");
var img131 = document.getElementById("img131");
var img132 = document.getElementById("img132");
var img133 = document.getElementById("img133");

var modalImg1 = document.getElementById("img01");
var modalImg2 = document.getElementById("img02");
var modalImg3 = document.getElementById("img03");
var modalImg4 = document.getElementById("img04");
var modalImg5 = document.getElementById("img05");
var modalImg6 = document.getElementById("img06");
var modalImg7 = document.getElementById("img07");
var modalImg8 = document.getElementById("img08");
var modalImg9 = document.getElementById("img09");
var modalImg10 = document.getElementById("img10");
var modalImg11 = document.getElementById("img11");
var modalImg12 = document.getElementById("img12");
var modalImg13 = document.getElementById("img13");
var modalImg14 = document.getElementById("img14");
var modalImg15 = document.getElementById("img15");
var modalImg16 = document.getElementById("img16");
var modalImg17 = document.getElementById("img17");
var modalImg18 = document.getElementById("img18");
var modalImg19 = document.getElementById("img19");
var modalImg20 = document.getElementById("img20");
var modalImg21 = document.getElementById("img21");
var modalImg22 = document.getElementById("img22");
var modalImg23 = document.getElementById("img23");
var modalImg24 = document.getElementById("img24");
var modalImg25 = document.getElementById("img25");
var modalImg26 = document.getElementById("img26");
var modalImg27 = document.getElementById("img27");
var modalImg28 = document.getElementById("img28");
var modalImg29 = document.getElementById("img29");
var modalImg30 = document.getElementById("img30");
var modalImg31 = document.getElementById("img31");
var modalImg32 = document.getElementById("img32");
var modalImg33 = document.getElementById("img33");
var modalImg34 = document.getElementById("img34");
var modalImg35 = document.getElementById("img35");
var modalImg36 = document.getElementById("img36");
var modalImg37 = document.getElementById("img37");
var modalImg38 = document.getElementById("img38");
var modalImg39 = document.getElementById("img39");
var modalImg40 = document.getElementById("img40");
var modalImg41 = document.getElementById("img41");
var modalImg42 = document.getElementById("img42");
var modalImg43 = document.getElementById("img43");
var modalImg44 = document.getElementById("img44");
var modalImg45 = document.getElementById("img45");
var modalImg46 = document.getElementById("img46");
var modalImg47 = document.getElementById("img47");
var modalImg48 = document.getElementById("img48");
var modalImg49 = document.getElementById("img49");
var modalImg50 = document.getElementById("img50");
var modalImg51 = document.getElementById("img51");
var modalImg52 = document.getElementById("img52");
var modalImg53 = document.getElementById("img53");
var modalImg54 = document.getElementById("img54");
var modalImg55 = document.getElementById("img55");
var modalImg56 = document.getElementById("img56");
var modalImg57 = document.getElementById("img57");
var modalImg58 = document.getElementById("img58");
var modalImg59 = document.getElementById("img59");
var modalImg60 = document.getElementById("img60");
var modalImg61 = document.getElementById("img61");
var modalImg62 = document.getElementById("img62");
var modalImg63 = document.getElementById("img63");
var modalImg64 = document.getElementById("img64");
var modalImg65 = document.getElementById("img65");
var modalImg66 = document.getElementById("img66");
var modalImg67 = document.getElementById("img67");
var modalImg68 = document.getElementById("img68");
var modalImg69 = document.getElementById("img69");
var modalImg70 = document.getElementById("img70");
var modalImg71 = document.getElementById("img71");
var modalImg72 = document.getElementById("img72");
var modalImg73 = document.getElementById("img73");
var modalImg74 = document.getElementById("img74");
var modalImg75 = document.getElementById("img75");
var modalImg76 = document.getElementById("img76");
var modalImg77 = document.getElementById("img77");
var modalImg78 = document.getElementById("img78");
var modalImg79 = document.getElementById("img79");
var modalImg80 = document.getElementById("img80");
var modalImg81 = document.getElementById("img81");
var modalImg82 = document.getElementById("img82");
var modalImg83 = document.getElementById("img83");
var modalImg84 = document.getElementById("img84");
var modalImg85 = document.getElementById("img85");
var modalImg86 = document.getElementById("img86");
var modalImg87 = document.getElementById("img87");
var modalImg88 = document.getElementById("img88");
var modalImg89 = document.getElementById("img89");
var modalImg90 = document.getElementById("img90");
var modalImg91 = document.getElementById("img91");
var modalImg92 = document.getElementById("img92");
var modalImg93 = document.getElementById("img93");
var modalImg94 = document.getElementById("img94");
var modalImg95 = document.getElementById("img95");
var modalImg96 = document.getElementById("img96");
var modalImg97 = document.getElementById("img97");
var modalImg98 = document.getElementById("img98");
var modalImg99 = document.getElementById("img99");
var modalImg100 = document.getElementById("img100");
var modalImg101 = document.getElementById("img101");
var modalImg102 = document.getElementById("img102");
var modalImg103 = document.getElementById("img103");
var modalImg104 = document.getElementById("img104");
var modalImg105 = document.getElementById("img105");
var modalImg106 = document.getElementById("img106");
var modalImg107 = document.getElementById("img107");
var modalImg108 = document.getElementById("img108");
var modalImg109 = document.getElementById("img109");
var modalImg110 = document.getElementById("img110");
var modalImg111 = document.getElementById("img111");
var modalImg112 = document.getElementById("img112");
var modalImg113 = document.getElementById("img113");
var modalImg114 = document.getElementById("img114");
var modalImg115 = document.getElementById("img115");
var modalImg116 = document.getElementById("img116");
var modalImg117 = document.getElementById("img117");
var modalImg118 = document.getElementById("img118");
var modalImg119 = document.getElementById("img119");
var modalImg120 = document.getElementById("img120");
var modalImg121 = document.getElementById("img121");
var modalImg122 = document.getElementById("img122");
var modalImg123 = document.getElementById("img123");
var modalImg124 = document.getElementById("img124");
var modalImg125 = document.getElementById("img125");
var modalImg126 = document.getElementById("img126");
var modalImg127 = document.getElementById("img127");
var modalImg128 = document.getElementById("img128");
var modalImg129 = document.getElementById("img129");
var modalImg130 = document.getElementById("img130");
var modalImg131 = document.getElementById("img131");
var modalImg132 = document.getElementById("img132");
var modalImg133 = document.getElementById("img133");

var captionText1 = document.getElementById("caption");
var captionText2 = document.getElementById("caption2");
var captionText3 = document.getElementById("caption3");
var captionText4 = document.getElementById("caption4");
var captionText5 = document.getElementById("caption5");
var captionText6 = document.getElementById("caption6");
var captionText7 = document.getElementById("caption7");
var captionText8 = document.getElementById("caption8");
var captionText9 = document.getElementById("caption9");
var captionText10 = document.getElementById("caption10");
var captionText11 = document.getElementById("caption11");
var captionText12 = document.getElementById("caption12");
var captionText13 = document.getElementById("caption13");
var captionText14 = document.getElementById("caption14");
var captionText15 = document.getElementById("caption15");
var captionText16 = document.getElementById("caption16");
var captionText17 = document.getElementById("caption17");
var captionText18 = document.getElementById("caption18");
var captionText19 = document.getElementById("caption19");
var captionText20 = document.getElementById("caption20");
var captionText21 = document.getElementById("caption21");
var captionText22 = document.getElementById("caption22");
var captionText23 = document.getElementById("caption23");
var captionText24 = document.getElementById("caption24");
var captionText25 = document.getElementById("caption25");
var captionText26 = document.getElementById("caption26");
var captionText27 = document.getElementById("caption27");
var captionText28 = document.getElementById("caption28");
var captionText29 = document.getElementById("caption29");
var captionText30 = document.getElementById("caption30");
var captionText31 = document.getElementById("caption31");
var captionText32 = document.getElementById("caption32");
var captionText33 = document.getElementById("caption33");
var captionText34 = document.getElementById("caption34");
var captionText35 = document.getElementById("caption35");
var captionText36 = document.getElementById("caption36");
var captionText37 = document.getElementById("caption37");
var captionText38 = document.getElementById("caption38");
var captionText39 = document.getElementById("caption39");
var captionText40 = document.getElementById("caption40");
var captionText41 = document.getElementById("caption41");
var captionText42 = document.getElementById("caption42");
var captionText43 = document.getElementById("caption43");
var captionText44 = document.getElementById("caption44");
var captionText45 = document.getElementById("caption45");
var captionText46 = document.getElementById("caption46");
var captionText47 = document.getElementById("caption47");
var captionText48 = document.getElementById("caption48");
var captionText49 = document.getElementById("caption49");
var captionText50 = document.getElementById("caption50");
var captionText51 = document.getElementById("caption51");
var captionText52 = document.getElementById("caption52");
var captionText53 = document.getElementById("caption53");
var captionText54 = document.getElementById("caption54");
var captionText55 = document.getElementById("caption55");
var captionText56 = document.getElementById("caption56");
var captionText57 = document.getElementById("caption57");
var captionText58 = document.getElementById("caption58");
var captionText59 = document.getElementById("caption59");
var captionText60 = document.getElementById("caption60");
var captionText61 = document.getElementById("caption61");
var captionText62 = document.getElementById("caption62");
var captionText63 = document.getElementById("caption63");
var captionText64 = document.getElementById("caption64");
var captionText65 = document.getElementById("caption65");
var captionText66 = document.getElementById("caption66");
var captionText67 = document.getElementById("caption67");
var captionText68 = document.getElementById("caption68");
var captionText69 = document.getElementById("caption69");
var captionText70 = document.getElementById("caption70");
var captionText71 = document.getElementById("caption71");
var captionText72 = document.getElementById("caption72");
var captionText73 = document.getElementById("caption73");
var captionText74 = document.getElementById("caption74");
var captionText75 = document.getElementById("caption75");
var captionText76 = document.getElementById("caption76");
var captionText77 = document.getElementById("caption77");
var captionText78 = document.getElementById("caption78");
var captionText79 = document.getElementById("caption79");
var captionText80 = document.getElementById("caption80");
var captionText81 = document.getElementById("caption81");
var captionText82 = document.getElementById("caption82");
var captionText83 = document.getElementById("caption83");
var captionText84 = document.getElementById("caption84");
var captionText85 = document.getElementById("caption85");
var captionText86 = document.getElementById("caption86");
var captionText87 = document.getElementById("caption87");
var captionText88 = document.getElementById("caption88");
var captionText89 = document.getElementById("caption89");
var captionText90 = document.getElementById("caption90");
var captionText91 = document.getElementById("caption91");
var captionText92 = document.getElementById("caption92");
var captionText93 = document.getElementById("caption93");
var captionText94 = document.getElementById("caption94");
var captionText95 = document.getElementById("caption95");
var captionText96 = document.getElementById("caption96");
var captionText97 = document.getElementById("caption97");
var captionText98 = document.getElementById("caption98");
var captionText99 = document.getElementById("caption99");
var captionText100 = document.getElementById("caption100");
var captionText101 = document.getElementById("caption101");
var captionText102 = document.getElementById("caption102");
var captionText103 = document.getElementById("caption103");
var captionText104 = document.getElementById("caption104");
var captionText105 = document.getElementById("caption105");
var captionText106 = document.getElementById("caption106");
var captionText107 = document.getElementById("caption107");
var captionText108 = document.getElementById("caption108");
var captionText109 = document.getElementById("caption109");
var captionText110 = document.getElementById("caption110");
var captionText111 = document.getElementById("caption111");
var captionText112 = document.getElementById("caption112");
var captionText113 = document.getElementById("caption113");
var captionText114 = document.getElementById("caption114");
var captionText115 = document.getElementById("caption115");
var captionText116 = document.getElementById("caption116");
var captionText117 = document.getElementById("caption117");
var captionText118 = document.getElementById("caption118");
var captionText119 = document.getElementById("caption119");
var captionText120 = document.getElementById("caption120");
var captionText121 = document.getElementById("caption121");
var captionText122 = document.getElementById("caption122");
var captionText123 = document.getElementById("caption123");
var captionText124 = document.getElementById("caption124");
var captionText125 = document.getElementById("caption125");
var captionText126 = document.getElementById("caption126");
var captionText127 = document.getElementById("caption127");
var captionText128 = document.getElementById("caption128");
var captionText129 = document.getElementById("caption129");
var captionText130 = document.getElementById("caption130");
var captionText131 = document.getElementById("caption131");
var captionText132 = document.getElementById("caption132");
var captionText133 = document.getElementById("caption133");

// Function to open modal for the first image
img1.onclick = function () {
  modal1.style.display = "block";
  modalImg1.src = this.src;
  captionText1.innerHTML = this.alt;
};

// Function to close modal for the first image
var span1 = document.getElementsByClassName("close")[0];
span1.onclick = function () {
  modal1.style.display = "none";
};
// Function to open modal for the second image
img2.onclick = function () {
  modal2.style.display = "block";
  modalImg2.src = this.src;
  captionText2.innerHTML = this.alt;
};

// Function to close modal for the second image
var span2 = document.getElementsByClassName("close")[1];
span2.onclick = function () {
  modal2.style.display = "none";
};

// Function to open modal for the third image
img3.onclick = function () {
  modal3.style.display = "block";
  modalImg3.src = this.src;
  captionText3.innerHTML = this.alt;
};

// Function to close modal for the third image
var span3 = document.getElementsByClassName("close")[2];
span3.onclick = function () {
  modal3.style.display = "none";
};

// Function to open modal for the fourth image
img4.onclick = function () {
  modal4.style.display = "block";
  modalImg4.src = this.src;
  captionText4.innerHTML = this.alt;
};

// Function to close modal for the fourth image
var span4 = document.getElementsByClassName("close")[3];
span4.onclick = function () {
  modal4.style.display = "none";
};

// Function to open modal for the fifth image
img5.onclick = function () {
  modal5.style.display = "block";
  modalImg5.src = this.src;
  captionText5.innerHTML = this.alt;
};

// Function to close modal for the fifth image
var span5 = document.getElementsByClassName("close")[4]; // Note: 4 is the index corresponding to the close button of the fifth modal
span5.onclick = function () {
  modal5.style.display = "none";
};

// Function to open modal for the sixth image
img6.onclick = function () {
  modal6.style.display = "block";
  modalImg6.src = this.src;
  captionText6.innerHTML = this.alt;
};

// Function to close modal for the sixth image
var span6 = document.getElementsByClassName("close")[5]; // Note: 5 is the index corresponding to the close button of the sixth modal
span6.onclick = function () {
  modal6.style.display = "none";
};

// Function to open modal for the seventh image
img7.onclick = function () {
  modal7.style.display = "block";
  modalImg7.src = this.src;
  captionText7.innerHTML = this.alt;
};

// Function to close modal for the seventh image
var span7 = document.getElementsByClassName("close")[6]; // Note: 6 is the index corresponding to the close button of the seventh modal
span7.onclick = function () {
  modal7.style.display = "none";
};

// Function to open modal for the eighth image
img8.onclick = function () {
  modal8.style.display = "block";
  modalImg8.src = this.src;
  captionText8.innerHTML = this.alt;
};

// Function to close modal for the eighth image
var span8 = document.getElementsByClassName("close")[7]; // Note: 7 is the index corresponding to the close button of the eighth modal
span8.onclick = function () {
  modal8.style.display = "none";
};

// Function to open modal for the ninth image
img9.onclick = function () {
  modal9.style.display = "block";
  modalImg9.src = this.src;
  captionText9.innerHTML = this.alt;
};

// Function to close modal for the ninth image
var span9 = document.getElementsByClassName("close")[8]; // Note: 8 is the index corresponding to the close button of the ninth modal
span9.onclick = function () {
  modal9.style.display = "none";
};

// Function to open modal for the tenth image
img10.onclick = function () {
  modal10.style.display = "block";
  modalImg10.src = this.src;
  captionText10.innerHTML = this.alt;
};

// Function to close modal for the tenth image
var span10 = document.getElementsByClassName("close")[9]; // Note: 9 is the index corresponding to the close button of the tenth modal
span10.onclick = function () {
  modal10.style.display = "none";
};

// Function to open modal for the eleventh image
img11.onclick = function () {
  modal11.style.display = "block";
  modalImg11.src = this.src;
  captionText11.innerHTML = this.alt;
};

// Function to close modal for the eleventh image
var span11 = document.getElementsByClassName("close")[10]; // Note: 10 is the index corresponding to the close button of the eleventh modal
span11.onclick = function () {
  modal11.style.display = "none";
};

// Function to open modal for the twelfth image
img12.onclick = function () {
  modal12.style.display = "block";
  modalImg12.src = this.src;
  captionText12.innerHTML = this.alt;
};

// Function to close modal for the twelfth image
var span12 = document.getElementsByClassName("close")[11]; // Note: 11 is the index corresponding to the close button of the twelfth modal
span12.onclick = function () {
  modal12.style.display = "none";
};

// Function to open modal for the thirteenth image
img13.onclick = function () {
  modal13.style.display = "block";
  modalImg13.src = this.src;
  captionText13.innerHTML = this.alt;
};

// Function to close modal for the thirteenth image
var span13 = document.getElementsByClassName("close")[12]; // Note: 12 is the index corresponding to the close button of the thirteenth modal
span13.onclick = function () {
  modal13.style.display = "none";
};

// Function to open modal for the fourteenth image
img14.onclick = function () {
  modal14.style.display = "block";
  modalImg14.src = this.src;
  captionText14.innerHTML = this.alt;
};

// Function to close modal for the fourteenth image
var span14 = document.getElementsByClassName("close")[13]; // Note: 13 is the index corresponding to the close button of the fourteenth modal
span14.onclick = function () {
  modal14.style.display = "none";
};

// Function to open modal for the fourteenth image
img15.onclick = function () {
  modal15.style.display = "block";
  modalImg15.src = this.src;
  captionText15.innerHTML = this.alt;
};

// Function to close modal for the fourteenth image
var span15 = document.getElementsByClassName("close")[14]; // Note: 13 is the index corresponding to the close button of the fourteenth modal
span15.onclick = function () {
  modal15.style.display = "none";
};
// Function to open modal for the fourteenth image
img16.onclick = function () {
  modal16.style.display = "block";
  modalImg16.src = this.src;
  captionText16.innerHTML = this.alt;
};

// Function to close modal for the fourteenth image
var span16 = document.getElementsByClassName("close")[15]; // Note: 13 is the index corresponding to the close button of the fourteenth modal
span16.onclick = function () {
  modal16.style.display = "none";
};
// Function to open modal for the fourteenth image
img17.onclick = function () {
  modal17.style.display = "block";
  modalImg17.src = this.src;
  captionText17.innerHTML = this.alt;
};

// Function to close modal for the fourteenth image
var span17 = document.getElementsByClassName("close")[16]; // Note: 13 is the index corresponding to the close button of the fourteenth modal
span17.onclick = function () {
  modal17.style.display = "none";
};
// Function to open modal for the fourteenth image
img18.onclick = function () {
  modal18.style.display = "block";
  modalImg18.src = this.src;
  captionText18.innerHTML = this.alt;
};

// Function to close modal for the fourteenth image
var span18 = document.getElementsByClassName("close")[17]; // Note: 13 is the index corresponding to the close button of the fourteenth modal
span18.onclick = function () {
  modal18.style.display = "none";
};
// Function to open modal for the fourteenth image
img19.onclick = function () {
  modal19.style.display = "block";
  modalImg19.src = this.src;
  captionText19.innerHTML = this.alt;
};

// Function to close modal for the fourteenth image
var span19 = document.getElementsByClassName("close")[18]; // Note: 13 is the index corresponding to the close button of the fourteenth modal
span19.onclick = function () {
  modal19.style.display = "none";
};
// Function to open modal for the fourteenth image
img20.onclick = function () {
  modal20.style.display = "block";
  modalImg20.src = this.src;
  captionText20.innerHTML = this.alt;
};

// Function to close modal for the fourteenth image
var span20 = document.getElementsByClassName("close")[19]; // Note: 13 is the index corresponding to the close button of the fourteenth modal
span20.onclick = function () {
  modal20.style.display = "none";
};
// Function to open modal for the fourteenth image
img21.onclick = function () {
  modal21.style.display = "block";
  modalImg21.src = this.src;
  captionText21.innerHTML = this.alt;
};

// Function to close modal for the fourteenth image
var span21 = document.getElementsByClassName("close")[20]; // Note: 13 is the index corresponding to the close button of the fourteenth modal
span21.onclick = function () {
  modal21.style.display = "none";
};
// Function to open modal for the fourteenth image
img22.onclick = function () {
  modal22.style.display = "block";
  modalImg22.src = this.src;
  captionText22.innerHTML = this.alt;
};

// Function to close modal for the fourteenth image
var span22 = document.getElementsByClassName("close")[21]; // Note: 13 is the index corresponding to the close button of the fourteenth modal
span22.onclick = function () {
  modal22.style.display = "none";
};
// Function to open modal for the fourteenth image
img23.onclick = function () {
  modal23.style.display = "block";
  modalImg23.src = this.src;
  captionText23.innerHTML = this.alt;
};

// Function to close modal for the fourteenth image
var span23 = document.getElementsByClassName("close")[22]; // Note: 13 is the index corresponding to the close button of the fourteenth modal
span23.onclick = function () {
  modal23.style.display = "none";
};
// Function to open modal for the fourteenth image
img24.onclick = function () {
  modal24.style.display = "block";
  modalImg24.src = this.src;
  captionText24.innerHTML = this.alt;
};

// Function to close modal for the fourteenth image
var span24 = document.getElementsByClassName("close")[23]; // Note: 13 is the index corresponding to the close button of the fourteenth modal
span24.onclick = function () {
  modal24.style.display = "none";
};
// Function to open modal for the fourteenth image
img25.onclick = function () {
  modal25.style.display = "block";
  modalImg25.src = this.src;
  captionText25.innerHTML = this.alt;
};

// Function to close modal for the fourteenth image
var span25 = document.getElementsByClassName("close")[24]; // Note: 13 is the index corresponding to the close button of the fourteenth modal
span25.onclick = function () {
  modal25.style.display = "none";
};
// Function to open modal for the fourteenth image
img26.onclick = function () {
  modal26.style.display = "block";
  modalImg26.src = this.src;
  captionText26.innerHTML = this.alt;
};

// Function to close modal for the fourteenth image
var span26 = document.getElementsByClassName("close")[25]; // Note: 13 is the index corresponding to the close button of the fourteenth modal
span26.onclick = function () {
  modal26.style.display = "none";
};
// Function to open modal for the fourteenth image
img27.onclick = function () {
  modal27.style.display = "block";
  modalImg27.src = this.src;
  captionText27.innerHTML = this.alt;
};

// Function to close modal for the fourteenth image
var span27 = document.getElementsByClassName("close")[26]; // Note: 13 is the index corresponding to the close button of the fourteenth modal
span27.onclick = function () {
  modal27.style.display = "none";
};
// Function to open modal for the fourteenth image
img28.onclick = function () {
  modal28.style.display = "block";
  modalImg28.src = this.src;
  captionText28.innerHTML = this.alt;
};

// Function to close modal for the fourteenth image
var span28 = document.getElementsByClassName("close")[27]; // Note: 13 is the index corresponding to the close button of the fourteenth modal
span28.onclick = function () {
  modal28.style.display = "none";
};
// Function to open modal for the fourteenth image
img29.onclick = function () {
  modal29.style.display = "block";
  modalImg29.src = this.src;
  captionText29.innerHTML = this.alt;
};

// Function to close modal for the fourteenth image
var span29 = document.getElementsByClassName("close")[28]; // Note: 13 is the index corresponding to the close button of the fourteenth modal
span29.onclick = function () {
  modal29.style.display = "none";
};
// Function to open modal for the fourteenth image
img30.onclick = function () {
  modal30.style.display = "block";
  modalImg30.src = this.src;
  captionText30.innerHTML = this.alt;
};

// Function to close modal for the fourteenth image
var span30 = document.getElementsByClassName("close")[29]; // Note: 13 is the index corresponding to the close button of the fourteenth modal
span30.onclick = function () {
  modal30.style.display = "none";
};
// Function to open modal for the fourteenth image
img31.onclick = function () {
  modal31.style.display = "block";
  modalImg31.src = this.src;
  captionText31.innerHTML = this.alt;
};

// Function to close modal for the fourteenth image
var span31 = document.getElementsByClassName("close")[30]; // Note: 13 is the index corresponding to the close button of the fourteenth modal
span31.onclick = function () {
  modal31.style.display = "none";
};
// Function to open modal for the fourteenth image
img32.onclick = function () {
  modal32.style.display = "block";
  modalImg32.src = this.src;
  captionText32.innerHTML = this.alt;
};

// Function to close modal for the fourteenth image
var span32 = document.getElementsByClassName("close")[31]; // Note: 13 is the index corresponding to the close button of the fourteenth modal
span32.onclick = function () {
  modal32.style.display = "none";
};
// Function to open modal for the fourteenth image
img33.onclick = function () {
  modal33.style.display = "block";
  modalImg33.src = this.src;
  captionText33.innerHTML = this.alt;
};

// Function to close modal for the fourteenth image
var span33 = document.getElementsByClassName("close")[32]; // Note: 13 is the index corresponding to the close button of the fourteenth modal
span33.onclick = function () {
  modal33.style.display = "none";
};
// Function to open modal for the fourteenth image
img34.onclick = function () {
  modal34.style.display = "block";
  modalImg34.src = this.src;
  captionText34.innerHTML = this.alt;
};

// Function to close modal for the fourteenth image
var span34 = document.getElementsByClassName("close")[33]; // Note: 13 is the index corresponding to the close button of the fourteenth modal
span34.onclick = function () {
  modal34.style.display = "none";
};
// Function to open modal for the thirty-fifth image
img35.onclick = function () {
  modal35.style.display = "block";
  modalImg35.src = this.src;
  captionText35.innerHTML = this.alt;
};

// Function to close modal for the thirty-fifth image
var span35 = document.getElementsByClassName("close")[34]; // Note: 34 is the index corresponding to the close button of the thirty-fifth modal
span35.onclick = function () {
  modal35.style.display = "none";
};

// Function to open modal for the thirty-sixth image
img36.onclick = function () {
  modal36.style.display = "block";
  modalImg36.src = this.src;
  captionText36.innerHTML = this.alt;
};

// Function to close modal for the thirty-sixth image
var span36 = document.getElementsByClassName("close")[35]; // Note: 35 is the index corresponding to the close button of the thirty-sixth modal
span36.onclick = function () {
  modal36.style.display = "none";
};

// Function to open modal for the thirty-seventh image
img37.onclick = function () {
  modal37.style.display = "block";
  modalImg37.src = this.src;
  captionText37.innerHTML = this.alt;
};

// Function to close modal for the thirty-seventh image
var span37 = document.getElementsByClassName("close")[36]; // Note: 36 is the index corresponding to the close button of the thirty-seventh modal
span37.onclick = function () {
  modal37.style.display = "none";
};

// Function to open modal for the thirty-eighth image
img38.onclick = function () {
  modal38.style.display = "block";
  modalImg38.src = this.src;
  captionText38.innerHTML = this.alt;
};

// Function to close modal for the thirty-eighth image
var span38 = document.getElementsByClassName("close")[37]; // Note: 37 is the index corresponding to the close button of the thirty-eighth modal
span38.onclick = function () {
  modal38.style.display = "none";
};

// Function to open modal for the thirty-ninth image
img39.onclick = function () {
  modal39.style.display = "block";
  modalImg39.src = this.src;
  captionText39.innerHTML = this.alt;
};

// Function to close modal for the thirty-ninth image
var span39 = document.getElementsByClassName("close")[38]; // Note: 38 is the index corresponding to the close button of the thirty-ninth modal
span39.onclick = function () {
  modal39.style.display = "none";
};

// Function to open modal for the fortieth image
img40.onclick = function () {
  modal40.style.display = "block";
  modalImg40.src = this.src;
  captionText40.innerHTML = this.alt;
};

// Function to close modal for the fortieth image
var span40 = document.getElementsByClassName("close")[39]; // Note: 39 is the index corresponding to the close button of the fortieth modal
span40.onclick = function () {
  modal40.style.display = "none";
};

// Function to open modal for the forty-first image
img41.onclick = function () {
  modal41.style.display = "block";
  modalImg41.src = this.src;
  captionText41.innerHTML = this.alt;
};

// Function to close modal for the forty-first image
var span41 = document.getElementsByClassName("close")[40]; // Note: 40 is the index corresponding to the close button of the forty-first modal
span41.onclick = function () {
  modal41.style.display = "none";
};

// Function to open modal for the forty-second image
img42.onclick = function () {
  modal42.style.display = "block";
  modalImg42.src = this.src;
  captionText42.innerHTML = this.alt;
};

// Function to close modal for the forty-second image
var span42 = document.getElementsByClassName("close")[41]; // Note: 41 is the index corresponding to the close button of the forty-second modal
span42.onclick = function () {
  modal42.style.display = "none";
};

// Function to open modal for the forty-third image
img43.onclick = function () {
  modal43.style.display = "block";
  modalImg43.src = this.src;
  captionText43.innerHTML = this.alt;
};

// Function to close modal for the forty-third image
var span43 = document.getElementsByClassName("close")[42]; // Note: 42 is the index corresponding to the close button of the forty-third modal
span43.onclick = function () {
  modal43.style.display = "none";
};

// Function to open modal for the forty-fourth image
img44.onclick = function () {
  modal44.style.display = "block";
  modalImg44.src = this.src;
  captionText44.innerHTML = this.alt;
};

// Function to close modal for the forty-fourth image
var span44 = document.getElementsByClassName("close")[43]; // Note: 43 is the index corresponding to the close button of the forty-fourth modal
span44.onclick = function () {
  modal44.style.display = "none";
};

// Function to open modal for the forty-fifth image
img45.onclick = function () {
  modal45.style.display = "block";
  modalImg45.src = this.src;
  captionText45.innerHTML = this.alt;
};

// Function to close modal for the forty-fifth image
var span45 = document.getElementsByClassName("close")[44]; // Note: 44 is the index corresponding to the close button of the forty-fifth modal
span45.onclick = function () {
  modal45.style.display = "none";
};

// Function to open modal for the forty-sixth image
img46.onclick = function () {
  modal46.style.display = "block";
  modalImg46.src = this.src;
  captionText46.innerHTML = this.alt;
};

// Function to close modal for the forty-sixth image
var span46 = document.getElementsByClassName("close")[45]; // Note: 45 is the index corresponding to the close button of the forty-sixth modal
span46.onclick = function () {
  modal46.style.display = "none";
};

// Function to open modal for the forty-seventh image
img47.onclick = function () {
  modal47.style.display = "block";
  modalImg47.src = this.src;
  captionText47.innerHTML = this.alt;
};

// Function to close modal for the forty-seventh image
var span47 = document.getElementsByClassName("close")[46]; // Note: 46 is the index corresponding to the close button of the forty-seventh modal
span47.onclick = function () {
  modal47.style.display = "none";
};

// Function to open modal for the forty-eighth image
img48.onclick = function () {
  modal48.style.display = "block";
  modalImg48.src = this.src;
  captionText48.innerHTML = this.alt;
};

// Function to close modal for the forty-eighth image
var span48 = document.getElementsByClassName("close")[47]; // Note: 47 is the index corresponding to the close button of the forty-eighth modal
span48.onclick = function () {
  modal48.style.display = "none";
};

// Function to open modal for the forty-ninth image
img49.onclick = function () {
  modal49.style.display = "block";
  modalImg49.src = this.src;
  captionText49.innerHTML = this.alt;
};

// Function to close modal for the forty-ninth image
var span49 = document.getElementsByClassName("close")[48]; // Note: 48 is the index corresponding to the close button of the forty-ninth modal
span49.onclick = function () {
  modal49.style.display = "none";
};

// Function to open modal for the fiftieth image
img50.onclick = function () {
  modal50.style.display = "block";
  modalImg50.src = this.src;
  captionText50.innerHTML = this.alt;
};

// Function to close modal for the fiftieth image
var span50 = document.getElementsByClassName("close")[49]; // Note: 49 is the index corresponding to the close button of the fiftieth modal
span50.onclick = function () {
  modal50.style.display = "none";
};

// Function to open modal for the fifty-first image
img51.onclick = function () {
  modal51.style.display = "block";
  modalImg51.src = this.src;
  captionText51.innerHTML = this.alt;
};

// Function to close modal for the fifty-first image
var span51 = document.getElementsByClassName("close")[50]; // Note: 50 is the index corresponding to the close button of the fifty-first modal
span51.onclick = function () {
  modal51.style.display = "none";
};

// Function to open modal for the fifty-second image
img52.onclick = function () {
  modal52.style.display = "block";
  modalImg52.src = this.src;
  captionText52.innerHTML = this.alt;
};

// Function to close modal for the fifty-second image
var span52 = document.getElementsByClassName("close")[51]; // Note: 51 is the index corresponding to the close button of the fifty-second modal
span52.onclick = function () {
  modal52.style.display = "none";
};

// Function to open modal for the fifty-third image
img53.onclick = function () {
  modal53.style.display = "block";
  modalImg53.src = this.src;
  captionText53.innerHTML = this.alt;
};

// Function to close modal for the fifty-third image
var span53 = document.getElementsByClassName("close")[52]; // Note: 52 is the index corresponding to the close button of the fifty-third modal
span53.onclick = function () {
  modal53.style.display = "none";
};

// Function to open modal for the fifty-fourth image
img54.onclick = function () {
  modal54.style.display = "block";
  modalImg54.src = this.src;
  captionText54.innerHTML = this.alt;
};

// Function to close modal for the fifty-fourth image
var span54 = document.getElementsByClassName("close")[53]; // Note: 53 is the index corresponding to the close button of the fifty-fourth modal
span54.onclick = function () {
  modal54.style.display = "none";
};

// Function to open modal for the fifty-fifth image
img55.onclick = function () {
  modal55.style.display = "block";
  modalImg55.src = this.src;
  captionText55.innerHTML = this.alt;
};

// Function to close modal for the fifty-fifth image
var span55 = document.getElementsByClassName("close")[54]; // Note: 54 is the index corresponding to the close button of the fifty-fifth modal
span55.onclick = function () {
  modal55.style.display = "none";
};

// Function to open modal for the fifty-sixth image
img56.onclick = function () {
  modal56.style.display = "block";
  modalImg56.src = this.src;
  captionText56.innerHTML = this.alt;
};

// Function to close modal for the fifty-sixth image
var span56 = document.getElementsByClassName("close")[55]; // Note: 55 is the index corresponding to the close button of the fifty-sixth modal
span56.onclick = function () {
  modal56.style.display = "none";
};

// Function to open modal for the fifty-seventh image
img57.onclick = function () {
  modal57.style.display = "block";
  modalImg57.src = this.src;
  captionText57.innerHTML = this.alt;
};

// Function to close modal for the fifty-seventh image
var span57 = document.getElementsByClassName("close")[56]; // Note: 56 is the index corresponding to the close button of the fifty-seventh modal
span57.onclick = function () {
  modal57.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img58.onclick = function () {
  modal58.style.display = "block";
  modalImg58.src = this.src;
  captionText58.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span58 = document.getElementsByClassName("close")[57]; // Note: 57 is the index corresponding to the close button of the fifty-eighth modal
span58.onclick = function () {
  modal58.style.display = "none";
};

// Function to open modal for the fifty-ninth image
img59.onclick = function () {
  modal59.style.display = "block";
  modalImg59.src = this.src;
  captionText59.innerHTML = this.alt;
};

// Function to close modal for the fifty-ninth image
var span59 = document.getElementsByClassName("close")[58]; // Note: 58 is the index corresponding to the close button of the fifty-ninth modal
span59.onclick = function () {
  modal59.style.display = "none";
};

// Function to open modal for the sixtieth image
img60.onclick = function () {
  modal60.style.display = "block";
  modalImg60.src = this.src;
  captionText60.innerHTML = this.alt;
};

// Function to close modal for the sixtieth image
var span60 = document.getElementsByClassName("close")[59]; // Note: 59 is the index corresponding to the close button of the sixtieth modal
span60.onclick = function () {
  modal60.style.display = "none";
};

// Function to open modal for the fifty-first image
img61.onclick = function () {
  modal61.style.display = "block";
  modalImg61.src = this.src;
  captionText61.innerHTML = this.alt;
};

// Function to close modal for the fifty-first image
var span61 = document.getElementsByClassName("close")[60]; // Note: 60 is the index corresponding to the close button of the fifty-first modal
span61.onclick = function () {
  modal61.style.display = "none";
};

// Function to open modal for the fifty-second image
img62.onclick = function () {
  modal62.style.display = "block";
  modalImg62.src = this.src;
  captionText62.innerHTML = this.alt;
};

// Function to close modal for the fifty-second image
var span62 = document.getElementsByClassName("close")[61]; // Note: 61 is the index corresponding to the close button of the fifty-second modal
span62.onclick = function () {
  modal62.style.display = "none";
};

// Function to open modal for the fifty-third image
img63.onclick = function () {
  modal63.style.display = "block";
  modalImg63.src = this.src;
  captionText63.innerHTML = this.alt;
};

// Function to close modal for the fifty-third image
var span63 = document.getElementsByClassName("close")[62]; // Note: 62 is the index corresponding to the close button of the fifty-third modal
span63.onclick = function () {
  modal63.style.display = "none";
};

// Function to open modal for the fifty-fourth image
img64.onclick = function () {
  modal64.style.display = "block";
  modalImg64.src = this.src;
  captionText64.innerHTML = this.alt;
};

// Function to close modal for the fifty-fourth image
var span64 = document.getElementsByClassName("close")[63]; // Note: 63 is the index corresponding to the close button of the fifty-fourth modal
span64.onclick = function () {
  modal64.style.display = "none";
};

// Function to open modal for the fifty-fifth image
img65.onclick = function () {
  modal65.style.display = "block";
  modalImg65.src = this.src;
  captionText65.innerHTML = this.alt;
};

// Function to close modal for the fifty-fifth image
var span65 = document.getElementsByClassName("close")[64]; // Note: 64 is the index corresponding to the close button of the fifty-fifth modal
span65.onclick = function () {
  modal65.style.display = "none";
};

// Function to open modal for the fifty-sixth image
img66.onclick = function () {
  modal66.style.display = "block";
  modalImg66.src = this.src;
  captionText66.innerHTML = this.alt;
};

// Function to close modal for the fifty-sixth image
var span66 = document.getElementsByClassName("close")[65]; // Note: 65 is the index corresponding to the close button of the fifty-sixth modal
span66.onclick = function () {
  modal66.style.display = "none";
};

// Function to open modal for the fifty-seventh image
img67.onclick = function () {
  modal67.style.display = "block";
  modalImg67.src = this.src;
  captionText67.innerHTML = this.alt;
};

// Function to close modal for the fifty-seventh image
var span67 = document.getElementsByClassName("close")[66]; // Note: 66 is the index corresponding to the close button of the fifty-seventh modal
span67.onclick = function () {
  modal67.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img68.onclick = function () {
  modal68.style.display = "block";
  modalImg68.src = this.src;
  captionText68.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span68 = document.getElementsByClassName("close")[67];
span68.onclick = function () {
  modal68.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img69.onclick = function () {
  modal69.style.display = "block";
  modalImg69.src = this.src;
  captionText69.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span69 = document.getElementsByClassName("close")[68];
span69.onclick = function () {
  modal69.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img70.onclick = function () {
  modal70.style.display = "block";
  modalImg70.src = this.src;
  captionText70.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span70 = document.getElementsByClassName("close")[69];
span70.onclick = function () {
  modal70.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img71.onclick = function () {
  modal71.style.display = "block";
  modalImg71.src = this.src;
  captionText71.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span71 = document.getElementsByClassName("close")[70];
span71.onclick = function () {
  modal71.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img72.onclick = function () {
  modal72.style.display = "block";
  modalImg72.src = this.src;
  captionText72.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span72 = document.getElementsByClassName("close")[71];
span72.onclick = function () {
  modal72.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img73.onclick = function () {
  modal73.style.display = "block";
  modalImg73.src = this.src;
  captionText73.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span73 = document.getElementsByClassName("close")[72];
span73.onclick = function () {
  modal73.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img74.onclick = function () {
  modal74.style.display = "block";
  modalImg74.src = this.src;
  captionText74.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span74 = document.getElementsByClassName("close")[73];
span74.onclick = function () {
  modal74.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img75.onclick = function () {
  modal75.style.display = "block";
  modalImg75.src = this.src;
  captionText75.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span75 = document.getElementsByClassName("close")[74];
span75.onclick = function () {
  modal75.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img76.onclick = function () {
  modal76.style.display = "block";
  modalImg76.src = this.src;
  captionText76.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span76 = document.getElementsByClassName("close")[75];
span76.onclick = function () {
  modal76.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img77.onclick = function () {
  modal77.style.display = "block";
  modalImg77.src = this.src;
  captionText77.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span77 = document.getElementsByClassName("close")[76];
span77.onclick = function () {
  modal77.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img78.onclick = function () {
  modal78.style.display = "block";
  modalImg78.src = this.src;
  captionText78.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span78 = document.getElementsByClassName("close")[77];
span78.onclick = function () {
  modal78.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img79.onclick = function () {
  modal79.style.display = "block";
  modalImg79.src = this.src;
  captionText79.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span79 = document.getElementsByClassName("close")[78];
span79.onclick = function () {
  modal79.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img80.onclick = function () {
  modal80.style.display = "block";
  modalImg80.src = this.src;
  captionText80.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span80 = document.getElementsByClassName("close")[79];
span80.onclick = function () {
  modal80.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img81.onclick = function () {
  modal81.style.display = "block";
  modalImg81.src = this.src;
  captionText81.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span81 = document.getElementsByClassName("close")[80];
span81.onclick = function () {
  modal81.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img82.onclick = function () {
  modal82.style.display = "block";
  modalImg82.src = this.src;
  captionText82.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span82 = document.getElementsByClassName("close")[81];
span82.onclick = function () {
  modal82.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img83.onclick = function () {
  modal83.style.display = "block";
  modalImg83.src = this.src;
  captionText83.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span83 = document.getElementsByClassName("close")[82];
span83.onclick = function () {
  modal83.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img84.onclick = function () {
  modal84.style.display = "block";
  modalImg84.src = this.src;
  captionText84.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span84 = document.getElementsByClassName("close")[83];
span84.onclick = function () {
  modal84.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img85.onclick = function () {
  modal85.style.display = "block";
  modalImg85.src = this.src;
  captionText85.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span85 = document.getElementsByClassName("close")[84];
span85.onclick = function () {
  modal85.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img86.onclick = function () {
  modal86.style.display = "block";
  modalImg86.src = this.src;
  captionText86.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span86 = document.getElementsByClassName("close")[85];
span86.onclick = function () {
  modal86.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img87.onclick = function () {
  modal87.style.display = "block";
  modalImg87.src = this.src;
  captionText87.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span87 = document.getElementsByClassName("close")[86];
span87.onclick = function () {
  modal87.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img88.onclick = function () {
  modal88.style.display = "block";
  modalImg88.src = this.src;
  captionText88.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span88 = document.getElementsByClassName("close")[87];
span88.onclick = function () {
  modal88.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img89.onclick = function () {
  modal89.style.display = "block";
  modalImg89.src = this.src;
  captionText89.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span89 = document.getElementsByClassName("close")[88];
span89.onclick = function () {
  modal89.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img90.onclick = function () {
  modal90.style.display = "block";
  modalImg90.src = this.src;
  captionText90.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span90 = document.getElementsByClassName("close")[89];
span90.onclick = function () {
  modal90.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img91.onclick = function () {
  modal91.style.display = "block";
  modalImg91.src = this.src;
  captionText91.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span91 = document.getElementsByClassName("close")[90];
span91.onclick = function () {
  modal91.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img92.onclick = function () {
  modal92.style.display = "block";
  modalImg92.src = this.src;
  captionText92.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span92 = document.getElementsByClassName("close")[91];
span92.onclick = function () {
  modal92.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img93.onclick = function () {
  modal93.style.display = "block";
  modalImg93.src = this.src;
  captionText93.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span93 = document.getElementsByClassName("close")[92];
span93.onclick = function () {
  modal93.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img94.onclick = function () {
  modal94.style.display = "block";
  modalImg94.src = this.src;
  captionText94.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span94 = document.getElementsByClassName("close")[93];
span94.onclick = function () {
  modal94.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img95.onclick = function () {
  modal95.style.display = "block";
  modalImg95.src = this.src;
  captionText95.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span95 = document.getElementsByClassName("close")[94];
span95.onclick = function () {
  modal95.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img96.onclick = function () {
  modal96.style.display = "block";
  modalImg96.src = this.src;
  captionText96.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span96 = document.getElementsByClassName("close")[95];
span96.onclick = function () {
  modal96.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img97.onclick = function () {
  modal97.style.display = "block";
  modalImg97.src = this.src;
  captionText97.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span97 = document.getElementsByClassName("close")[96];
span97.onclick = function () {
  modal97.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img98.onclick = function () {
  modal98.style.display = "block";
  modalImg98.src = this.src;
  captionText98.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span98 = document.getElementsByClassName("close")[97];
span98.onclick = function () {
  modal98.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img99.onclick = function () {
  modal99.style.display = "block";
  modalImg99.src = this.src;
  captionText99.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span99 = document.getElementsByClassName("close")[98];
span99.onclick = function () {
  modal99.style.display = "none";
};

// Function to open modal for the fifty-eighth image
img100.onclick = function () {
  modal100.style.display = "block";
  modalImg100.src = this.src;
  captionText100.innerHTML = this.alt;
};

// Function to close modal for the fifty-eighth image
var span100 = document.getElementsByClassName("close")[99];
span100.onclick = function () {
  modal100.style.display = "none";
};

document.addEventListener("DOMContentLoaded", function () {
  for (let i = 101; i <= 133; i++) {
    let img = document.getElementById(`img${i}`);
    let modal = document.getElementById(`modal${i}`);
    let modalImg = document.getElementById(`modalImg${i}`);
    let captionText = document.getElementById(`captionText${i}`);
    let span = document.getElementsByClassName("close")[i - 1];

    if (img && modal && modalImg && captionText && span) {
      // Function to open modal for the ith image
      img.onclick = function () {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
      };

      // Function to close modal for the ith image
      span.onclick = function () {
        modal.style.display = "none";
      };
    }
  }
});

// Close modals when clicked outside the images
window.onclick = function (event) {
  if (event.target == modal1) {
    modal1.style.display = "none";
  }
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
  if (event.target == modal3) {
    modal3.style.display = "none";
  }
  if (event.target == modal4) {
    modal4.style.display = "none";
  }
  if (event.target == modal5) {
    modal5.style.display = "none";
  }
  if (event.target == modal6) {
    modal6.style.display = "none";
  }
  if (event.target == modal7) {
    modal7.style.display = "none";
  }
  if (event.target == modal8) {
    modal8.style.display = "none";
  }
  if (event.target == modal9) {
    modal9.style.display = "none";
  }
  if (event.target == modal10) {
    modal10.style.display = "none";
  }
  if (event.target == modal11) {
    modal11.style.display = "none";
  }
  if (event.target == modal12) {
    modal12.style.display = "none";
  }
  if (event.target == modal13) {
    modal13.style.display = "none";
  }
  if (event.target == modal14) {
    modal14.style.display = "none";
  }
  if (event.target == modal15) {
    modal15.style.display = "none";
  }
  if (event.target == modal16) {
    modal16.style.display = "none";
  }
  if (event.target == modal17) {
    modal17.style.display = "none";
  }
  if (event.target == modal18) {
    modal18.style.display = "none";
  }
  if (event.target == modal19) {
    modal19.style.display = "none";
  }
  if (event.target == modal20) {
    modal20.style.display = "none";
  }
  if (event.target == modal21) {
    modal21.style.display = "none";
  }
  if (event.target == modal22) {
    modal22.style.display = "none";
  }
  if (event.target == modal23) {
    modal23.style.display = "none";
  }
  if (event.target == modal24) {
    modal24.style.display = "none";
  }
  if (event.target == modal25) {
    modal25.style.display = "none";
  }
  if (event.target == modal26) {
    modal26.style.display = "none";
  }
  if (event.target == modal27) {
    modal27.style.display = "none";
  }
  if (event.target == modal28) {
    modal28.style.display = "none";
  }
  if (event.target == modal29) {
    modal29.style.display = "none";
  }
  if (event.target == modal30) {
    modal30.style.display = "none";
  }
  if (event.target == modal31) {
    modal31.style.display = "none";
  }
  if (event.target == modal32) {
    modal32.style.display = "none";
  }
  if (event.target == modal33) {
    modal33.style.display = "none";
  }
  if (event.target == modal34) {
    modal34.style.display = "none";
  }
  if (event.target == modal35) {
    modal35.style.display = "none";
  }
  if (event.target == modal36) {
    modal36.style.display = "none";
  }
  if (event.target == modal37) {
    modal37.style.display = "none";
  }
  if (event.target == modal38) {
    modal38.style.display = "none";
  }
  if (event.target == modal39) {
    modal39.style.display = "none";
  }
  if (event.target == modal40) {
    modal40.style.display = "none";
  }
  if (event.target == modal41) {
    modal41.style.display = "none";
  }
  if (event.target == modal42) {
    modal42.style.display = "none";
  }
  if (event.target == modal43) {
    modal43.style.display = "none";
  }
  if (event.target == modal44) {
    modal44.style.display = "none";
  }
  if (event.target == modal45) {
    modal45.style.display = "none";
  }
  if (event.target == modal46) {
    modal46.style.display = "none";
  }
  if (event.target == modal47) {
    modal47.style.display = "none";
  }
  if (event.target == modal48) {
    modal48.style.display = "none";
  }
  if (event.target == modal49) {
    modal49.style.display = "none";
  }
  if (event.target == modal50) {
    modal50.style.display = "none";
  }
  if (event.target == modal51) {
    modal51.style.display = "none";
  }
  if (event.target == modal52) {
    modal52.style.display = "none";
  }
  if (event.target == modal53) {
    modal53.style.display = "none";
  }
  if (event.target == modal54) {
    modal54.style.display = "none";
  }
  if (event.target == modal55) {
    modal55.style.display = "none";
  }
  if (event.target == modal56) {
    modal56.style.display = "none";
  }
  if (event.target == modal57) {
    modal57.style.display = "none";
  }
  if (event.target == modal58) {
    modal58.style.display = "none";
  }
  if (event.target == modal59) {
    modal59.style.display = "none";
  }
  if (event.target == modal60) {
    modal60.style.display = "none";
  }
  if (event.target == modal61) {
    modal61.style.display = "none";
  }
  if (event.target == modal62) {
    modal62.style.display = "none";
  }
  if (event.target == modal63) {
    modal63.style.display = "none";
  }
  if (event.target == modal64) {
    modal64.style.display = "none";
  }
  if (event.target == modal65) {
    modal65.style.display = "none";
  }
  if (event.target == modal66) {
    modal66.style.display = "none";
  }
  if (event.target == modal67) {
    modal67.style.display = "none";
  }
  if (event.target == modal68) {
    modal68.style.display = "none";
  }
  if (event.target == modal69) {
    modal69.style.display = "none";
  }
  if (event.target == modal70) {
    modal70.style.display = "none";
  }
  if (event.target == modal71) {
    modal71.style.display = "none";
  }
  if (event.target == modal72) {
    modal72.style.display = "none";
  }
  if (event.target == modal73) {
    modal73.style.display = "none";
  }
  if (event.target == modal74) {
    modal74.style.display = "none";
  }
  if (event.target == modal75) {
    modal75.style.display = "none";
  }
  if (event.target == modal76) {
    modal76.style.display = "none";
  }
  if (event.target == modal77) {
    modal77.style.display = "none";
  }
  if (event.target == modal78) {
    modal78.style.display = "none";
  }
  if (event.target == modal79) {
    modal79.style.display = "none";
  }
  if (event.target == modal80) {
    modal80.style.display = "none";
  }
  if (event.target == modal81) {
    modal81.style.display = "none";
  }
  if (event.target == modal82) {
    modal82.style.display = "none";
  }
  if (event.target == modal83) {
    modal83.style.display = "none";
  }
  if (event.target == modal84) {
    modal84.style.display = "none";
  }
  if (event.target == modal85) {
    modal85.style.display = "none";
  }
  if (event.target == modal86) {
    modal86.style.display = "none";
  }
  if (event.target == modal87) {
    modal87.style.display = "none";
  }
  if (event.target == modal88) {
    modal88.style.display = "none";
  }
  if (event.target == modal89) {
    modal89.style.display = "none";
  }
  if (event.target == modal90) {
    modal90.style.display = "none";
  }
  if (event.target == modal91) {
    modal91.style.display = "none";
  }
  if (event.target == modal92) {
    modal92.style.display = "none";
  }
  if (event.target == modal93) {
    modal93.style.display = "none";
  }
  if (event.target == modal94) {
    modal94.style.display = "none";
  }
  if (event.target == modal95) {
    modal95.style.display = "none";
  }
  if (event.target == modal96) {
    modal96.style.display = "none";
  }
  if (event.target == modal97) {
    modal97.style.display = "none";
  }
  if (event.target == modal98) {
    modal98.style.display = "none";
  }
  if (event.target == modal99) {
    modal99.style.display = "none";
  }
  if (event.target == modal100) {
    modal100.style.display = "none";
  }
  if (event.target == modal101) {
    modal101.style.display = "none";
  }
  if (event.target == modal102) {
    modal102.style.display = "none";
  }
  if (event.target == modal103) {
    modal103.style.display = "none";
  }
  if (event.target == modal104) {
    modal104.style.display = "none";
  }
  if (event.target == modal105) {
    modal105.style.display = "none";
  }
  if (event.target == modal106) {
    modal106.style.display = "none";
  }
  if (event.target == modal107) {
    modal107.style.display = "none";
  }
  if (event.target == modal108) {
    modal108.style.display = "none";
  }
  if (event.target == modal109) {
    modal109.style.display = "none";
  }
  if (event.target == modal110) {
    modal110.style.display = "none";
  }
  if (event.target == modal111) {
    modal111.style.display = "none";
  }
  if (event.target == modal112) {
    modal112.style.display = "none";
  }
  if (event.target == modal113) {
    modal113.style.display = "none";
  }
  if (event.target == modal114) {
    modal114.style.display = "none";
  }
  if (event.target == modal115) {
    modal115.style.display = "none";
  }
  if (event.target == modal116) {
    modal116.style.display = "none";
  }
  if (event.target == modal117) {
    modal117.style.display = "none";
  }
  if (event.target == modal118) {
    modal118.style.display = "none";
  }
  if (event.target == modal119) {
    modal119.style.display = "none";
  }
  if (event.target == modal120) {
    modal120.style.display = "none";
  }
  if (event.target == modal121) {
    modal121.style.display = "none";
  }
  if (event.target == modal122) {
    modal122.style.display = "none";
  }
  if (event.target == modal123) {
    modal123.style.display = "none";
  }
  if (event.target == modal124) {
    modal124.style.display = "none";
  }
  if (event.target == modal125) {
    modal125.style.display = "none";
  }
  if (event.target == modal126) {
    modal126.style.display = "none";
  }
  if (event.target == modal127) {
    modal127.style.display = "none";
  }
  if (event.target == modal128) {
    modal128.style.display = "none";
  }
  if (event.target == modal129) {
    modal129.style.display = "none";
  }
  if (event.target == modal130) {
    modal130.style.display = "none";
  }
};
