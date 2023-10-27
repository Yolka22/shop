import { React, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, loadArticles } from "../redux/actions";
import styles from "./styles.module.css"

import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from '@mui/joy/TabPanel';
import ArticleTabe from "./ArticleTable/ArticleTable";


export default function Admin() {
  const admin = useSelector((state) => state.admin);
  const articles = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  const login = () => {
    dispatch(adminLogin());
  };

  login();

  useEffect(() => {
    dispatch(loadArticles());
  }, [dispatch]);

  return admin ? (


    
    <div>
      <div className={styles.Title}>Admin Panel</div>
      <Tabs aria-label="Basic tabs" defaultValue={0}>
      <TabList>
        <Tab>First tab</Tab>
        <Tab>Second tab</Tab>
        <Tab>Third tab</Tab>
      </TabList>
      <TabPanel value={0}>
        <ArticleTabe articles={articles}></ArticleTabe>
      </TabPanel>
      <TabPanel value={1}>
        <b>Second</b> tab panel
      </TabPanel>
      <TabPanel value={2}>
        <b>Third</b> tab panel
      </TabPanel>
    </Tabs>
    </div>
  ) : (
    <div>Login</div>
  );
}