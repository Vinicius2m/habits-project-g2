import { useState } from "react";
import { Redirect, useHistory, useParams } from "react-router";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import groupImg from "../../assets/vectors/background_dashboard_specific_group.svg";
import GoalCard from "../../components/GoalCard";
import ActivityCard from "../../components/ActivityCard";
import ModalContact from "../../components/ModalContact";
import ModalNewActivity from "../../components/ModalNewActivity";
import ModalNewGoal from "../../components/ModalNewGoal";
import Modal from "../../components/Modal";
import api from "../../services/api";
import { useModal } from "../../providers/modal";
import { Container, Button, Subscribed } from "./style";
import { useAuth } from "../../providers/auth";
import { useEffect } from "react";
import { useSidebar } from "../../providers/sidebar";

const Group = () => {
  const history = useHistory();

  const params = useParams();

  const { token, isAuth, setIsAuth, writeToken } = useAuth();

  const [isSub, setIsSub] = useState(false);

  const [groupData, setGroupData] = useState({});

  const { openModalContact, setOpenModalContact } = useModal();

  const { openModalNewGoal, setOpenModalNewGoal } = useModal();

  const { openModalNewActivity, setOpenModalNewActivity } = useModal();

  const { closeSidebar } = useSidebar();

  useEffect(() => {
    api
      .get(`/groups/subscriptions/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setIsSub(response.data.some((e) => e.id == params.id));
      });
  }, []);

  useEffect(() => {
    api.get(`/groups/${params.id}/`).then((response) => {
      setGroupData(response.data);
    });
  });

  if (!token && !isAuth) {
    return <Redirect to="/" />;
  }

  const subscribe = () => {
    api
      .post(`/groups/${params.id}/subscribe/`, "", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(setIsSub(true));
  };

  const handleNavigation = (path) => {
    history.push(path);
  };

  const handleLogout = (path) => {
    if (path === "/") {
      localStorage.clear();
      writeToken(false);
      setIsAuth(false);
    }
    history.push(path);
  };

  const handleContact = () => {
    setOpenModalContact(true);
    closeSidebar();
  };

  return (
    <div>
      <Header buttonText="Logout" buttonUrl="/" />

      <Sidebar>
        <div>
          <button onClick={() => handleNavigation("/dashboard")}>
            Hábitos
          </button>
          <button onClick={() => handleNavigation("/groups")}>Grupos</button>
          <button onClick={handleContact}>Contato</button>
        </div>

        <div>
          <button onClick={() => handleLogout("/")}>Logout</button>
        </div>
      </Sidebar>

      {openModalNewGoal && (
        <Modal>
          <ModalNewGoal groupId={params.id} />
        </Modal>
      )}

      {openModalNewActivity && (
        <Modal>
          <ModalNewActivity groupId={params.id} />
        </Modal>
      )}

      {openModalContact && (
        <Modal>
          {" "}
          <ModalContact />{" "}
        </Modal>
      )}

      <Container>
        <img src={groupImg} alt="groups illustration" />
        <div id="main">
          <div id="groupCard">
            <div className="head">
              <h2> {groupData.name} </h2>
            </div>
            <p> {groupData.category} </p>
            <p> {groupData.description} </p>
          </div>
          <div id="modals">
            <div>
              <h3>Nova Meta</h3>
              <Button onClick={() => setOpenModalNewGoal(true)}>
                Adicionar
              </Button>
            </div>
            <div>
              <h3>Nova Atividade</h3>
              <Button onClick={() => setOpenModalNewActivity(true)}>
                Adicionar
              </Button>
            </div>
          </div>
          <div id="scroll">
            <div className="container">
              <h2>Metas</h2>
              <div className="scroll">
                {groupData.goals?.map((e) => (
                  <GoalCard key={e.id} goal={e} />
                ))}
              </div>
            </div>
            <div className="container">
              <h2>Atividades</h2>
              <div className="scroll">
                {groupData.activities?.map((e) => (
                  <ActivityCard key={e.id} activity={e} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div id="members">
          <div className="head">
            <h2>Membros</h2>
            {isSub ? (
              <Subscribed>Inscrito</Subscribed>
            ) : (
              <Button onClick={subscribe}>Inscrever-se</Button>
            )}
          </div>
          {groupData.users_on_group?.map((e) => (
            <p key={e.username}> {e.username} </p>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Group;
