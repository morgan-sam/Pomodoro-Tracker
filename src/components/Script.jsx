import React from 'react';
import bash from 'img/bash.svg';
import python from 'img/python.svg';
import FileIcon from 'components/FileIcon';
import { useHistory } from 'react-router-dom';
import { getSystemButtonStyle } from 'styles/systemSettings';
import bashScript from 'scripts/pomodoro.sh';
import pythonScript from 'scripts/pomodoro.py';
import firebase from 'config/firebase';

const screenContainer = {
	position: 'absolute',
	top: '0',
	left: '0',
	height: '100vh',
	width: '100vw',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
};

const settingsBox = {
	width: 'fit-content',
	height: 'fit-content',
	border: '1px solid black',
	display: 'flex',
	alignItems: 'center',
	borderRadius: '1rem',
	flexDirection: 'column',
	padding: '2rem'
};

const titleStyle = {
	padding: '1rem'
};

const returnButtonContainer = {
	padding: '3rem 0 2rem 0'
};

const downloadFile = (filename, text) => {
	const element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
};

const reauthenticate = (password) => {
	const user = firebase.auth().currentUser;
	const credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
	return user.reauthenticateAndRetrieveDataWithCredential(credential);
};

const getScriptString = async (file) => {
	const response = await fetch(file);
	let script = await response.text();
	script = script.replace('[EMAIL]', firebase.auth().currentUser.email);
	// script = script.replace('[PASSWORD]', password);
	return script;
};

const downloadPomodoroScript = async (file, extension) => {
	const script = await getScriptString(file);
	downloadFile('pomodoro.' + extension, script);
};

const Script = () => {
	const history = useHistory();
	const accountButtonStyle = getSystemButtonStyle(false);
	return (
		<div style={screenContainer}>
			<div style={settingsBox}>
				<h2 style={titleStyle}>Download Script</h2>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						width: '14rem',
						padding: '3rem'
					}}
				>
					<FileIcon
						onClick={() => downloadPomodoroScript(bashScript, 'sh')}
						style={{ cursor: 'pointer' }}
						icon={bash}
						text={'pomodoro.sh'}
					/>
					<FileIcon
						onClick={() => downloadPomodoroScript(pythonScript, 'py')}
						style={{ cursor: 'pointer' }}
						icon={python}
						text={'pomodoro.py'}
					/>
				</div>
				<div style={returnButtonContainer}>
					<button style={accountButtonStyle} onClick={() => history.push('/')}>
						Return
					</button>
				</div>
			</div>
		</div>
	);
};

export default Script;
