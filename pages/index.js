import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraKutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';



function ProfileSidebar(propriedades) {
  return(
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px'}} />
      <hr />

      <p>
      <a className="boxLink" href={`https://github.com/${propriedades.githubUser}.`}>
        @{propriedades.githubUser}
      </a>
    </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades) {
  return (
          <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
              {propriedades.title} ({propriedades.items.length})
          </h2>
            <ul> 
          {/* seguidores.map((itemAtual)=> {
            return (
              <li key={itemAtual}>
                <a href= {`https://github.com/${itemAtual}.png` }>
                <img src={itemAtual.image} />
                  <span>{itemAtual.title}</span>
                </a>
              </li>
              )
          }) */}
        </ul>

          </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {
  const githubUser = props.githubUser;
  const [comunidades, setComunidades] = React.useState([]);
  /*const comunidades = comunidades [0];
  const alteradorDeComunidades = comunidades [1]; */
  // const comunidades =['AluraKut']; //
  const pessoasFavoritas = [
    'juunegreiros',
    'peas',
    'rafaballerini',
    'omariosouto',
    'SpruceGabriela',
    'gustavoguanabara',
  ]
    const [seguidores, setSeguidores] = React.useState([]);
  // 0-  Pegar o Array  de dados do GitHub
    React.useEffect(function() {
      // GET
          fetch('https://api.github.com/users/kawan02/followers')
          .then(function (respostaDoServidor) {
            return respostaDoServidor.json();
          })
          .then(function (respostaCompleta) {
            setSeguidores(respostaCompleta);
       })

       //API do GraphQL
        fetch('https://graphql.datocms.com/', {
          method: 'POST',
          headers: {
            'Authorization': '900af8e491d82312fe84cfe74ee13a',
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
          },
          body: JSON.stringify({ "query": `query {
            allCommunities {
              title
              id
              imageUrl
              creatorslug
            }
          }` })
        })
        .then((response) => response.json())
        .then((respostaCompleta) => {
          const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
          console.log(comunidadesVindasDoDato)
          setComunidades(comunidadesVindasDoDato)
          
          
    
        })
    }, [])

    console.log('seguidores antes do return', seguidores);
  // 1- Criar um box que vai ter um map, baseado nos items do array 
  //que pegamos do GitHub

  return (
    <>
    <AlurakutMenu />
  <MainGrid>
    <div className="profileArea" style={{ gridArea: 'profileArea' }}>
    <ProfileSidebar githubUser ={githubUser}/>
    </div>

    <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
    <Box>
      <h1 className="title">
      Bem Vindo(a) {githubUser}
      </h1>

      <OrkutNostalgicIconSet />
    </Box>

    <Box>
      <h2 className="subTitle">O que você deseja fazer?</h2>
      <form onSubmit={function handleCriaComunidade(e) {
        e.preventDefault();
        const dadosDoForm = new FormData(e.target);

        console.log('Campo: ', dadosDoForm.get('title'));
        console.log('Campo: ', dadosDoForm.get('image'));


         const comunidade = {
            title: dadosDoForm.get('title'),
            imageUrl: dadosDoForm.get('image'),
            creatorslug: githubUser,
         }

         fetch('/api/comunidades', {
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json',
            },
            body: JSON.stringify(comunidade)
         })
         .then(async (response) => {
            const dados = await response.json();
            console.log(dados.registroCriado);
            const comunidade = dados.registroCriado;
            const comunidadesAtualizadas = [...comunidades, comunidade];
            setComunidades(comunidadesAtualizadas)
         })


      }}>
        <div>
          <input 
          placeholder="Qual vai ser o nome da sua comunidade?" 
          name="title" 
          aria-label="Qual vai ser o nome da sua comunidade?" 
          type="text"
          />
        </div>
        <div>
          <input 
          placeholder="Coloque uma URL para usarmos de capa" 
          name="image" 
          aria-label="Coloque uma URL para usarmos de capa" 
          />
        </div>

        <button>
          Criar comunidade
        </button>
      </form>
    </Box>
    <Box>
    <div>
        <h2>
          Faça já uma postagem:
        </h2>
          <br />
        <h4>Alguns projetos meus!</h4>
          <br />
        <h5>De: Kawan02 </h5>
          <br />
          <h5>Esse projeto foi feito através do vídeo da Rafaella Ballerini, onde foi feito um formulário de cadastro :)</h5>
        <img src="https://lh3.googleusercontent.com/wah6iHYS_yxw304EMFMUgrziV-NLxa5uuCQo7t11h3kNWI0hVyMvbKgKtDO3rwAVOSzp491YFAXlqPq3YFNkhUiPo3IsSRBSLohY4aarphRjLIyA9MkeCcSIgRpUvJ-8R3OoNR_GoDI9e0NZos4X4AloQrnGOhCKkVQGBAJnM4o24kkIgPUAfzlLwwXKvHaIBdcYfXlm42hYs9vLy_lR5Fd9jga6Ho8ZbTfm-DwUYx93Xz9kR7h2KzdqYva_3bPzmbj0C9i6pidc6VpXdWd2rbaqT2YAez-4FSUvLcohqVF_ybZ9fzoXfbWRRi-VpAr3fpJEBPvi5Bz6YjCI7ARnYJ_eDZbJ7c9NRIEPOeTH4ZmQ9jDNUTWSPLMdVXOLablS-aQc_7V3d5mzV1jsCVoifM6gfwEIAMQGHUeLIfPWCN9_gU3CTaxmxfdsvi5mGy1MHSSAMLyVL6sZBqQqJX3ETViD4ELn5XKNQ6yPQLC7AQtj85Q5FmMalyvpHOAWzngpKV6rpy3iD_fqs9hWfnTzAFmVSM_CML1-qNBnDNS35gemHMNFFAVqrQKwxRidQSN6jAWUWnJUCNauodU64hpbhV-LslvuLgG3YrvHYiumh-Oa6vdOiQNMqbnXL__nNDChXml_1fFLttEzXiKZVhYg2sMLDhjT2FazV5_w1iH89a7nuabxF7zWdljCbp4Ti18kkcdJiushsfvZifrsNkLJgRA=w1366-h624-no?authuser=0"/>
          <br />
          <h5>Site de cadastro, onde a proposta era fazer um formulário simples e usando a validação REGEX</h5>
          <img src="https://lh3.googleusercontent.com/G_5lokZA0c13VxrErzAPlY9TYNwlrWqMbJ7fIBRQzNVC5KY5RCkxmD9ppSWKp2k-vTI_QoTduMuTJ8u6ch52OzbxysfhD47xVzzm3wjPqWiBJ4Gl66_EYCqvgnPfDxMYGf75oGr8EohKJQ_EakTh4ldHSmlvd3AnhmVsRzqh9pXfsNh7DDqEAnOSYV8tY_4Y1Rilfy0aYZkC8jXwyIKkzEDgYb0-t2LztBDGmQRswZf9pdeuEzUTv_c-yVoNSviCw67VZuTxwmwg7NPhCiBbHs4v9DT86Hv1kaAiO6Ma--6z3l4D0_0kXEVKlfTRzJj-o4pO3i1fJWReFZ4GpyIGMWMn3fkeX5uC_CwVtUNZmlJvu017Rv1d74QRhCqI8wBrE0NZdgtRF5gLNoi_P36v3gNqkP8Oh-wjSsHKXVC_3QQBadxtSvtqJ-10ALu9vxkNPTYZ6IjZ31J8x5QkYOOUXHXPaQ11B15Hp6ueKaXf9X4Anv2NbpTkutG7vivR49W4O7_dg9a_q5SAxmdZ2YzpsNfFEPdqRMGGTUSb8EC2qoG3FLUxeAklDEmAmpKqkEk_sR8oO-vy99MH1XwV1MKg4oyafvT25tGqo0ru3I8ZuRe8qEEzT3Si-QqpPaRwS9nOLbsrrrH4T7Hk_bTKmvoYnN825WOt1IHv1i72AmtlrGSk1-HrBUP4rV6_9LZyLWrMG21kZloejD0prXB7V1JrlSM=w1112-h611-no?authuser=0"/>
      </div>
    </Box>
    </div>

    <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
      
        <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        Seguindo ({pessoasFavoritas.length})
      </h2>

      
            <ul> 
      

              {pessoasFavoritas.map((itemAtual)=> {
                return (
                  <li key={itemAtual}>
                    <a href= {`/users/${itemAtual}` }>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                  )
              })}
            </ul>
        </ProfileRelationsBoxWrapper>
          
        <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
            Comunidades ({comunidades.length})
      </h2>

        <ul> 
      
      {comunidades.map((itemAtual)=> {
        return (
          <li key={itemAtual.id}>
            <a href= {`/comunidades/${itemAtual.id}` }>
             <img src={itemAtual.imageUrl} />
              <span>{itemAtual.title}</span>
            </a>
          </li>
          )
      })}
    </ul>
    
        </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>
  </>
  )
} 


export async function getServerSideProps(context) {
  const cookies =  nookies.get(context)
  const token = cookies.USER_TOKEN

  const { isAuthenticated } = await fetch("https://alurakut-jwfelipee.vercel.app/api/auth", {
    headers: {
      Authorization: token,
    },
  })
  .then((resposta) => resposta.json())

  console.log('isAuthenticated', isAuthenticated);

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  } 


  const { githubUser } = jwt.decode(token);
  console.log(githubUser);
  return {
    props: {
      githubUser

    },  // will be passed to the page component as props
  } 
}