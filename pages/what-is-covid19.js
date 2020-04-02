import withLayout from '../components/Layout/Layout'

const What = () => {
	return (
		<>
		<div className="mt-5">
			<h1>What is COVID-19?</h1>
			<p>Coronavirus disease (COVID-19) is an infectious disease caused by a new virus.
			The disease causes respiratory illness (like the flu) with symptoms such as a cough, fever, and in more severe cases, difficulty breathing. You can protect yourself by washing your hands frequently, avoiding touching your face, and avoiding close contact (1 meter or 3 feet) with people who are unwell.</p>

			<h2>Basic protective measures against the new coronavirus</h2>
			
			<ul className="mt-4 mb-4">
				<li>
					<p>Wash your hands frequently<br/>
					<small>Regularly and thoroughly clean your hands with an alcohol-based hand rub or wash them with soap and water.</small></p>
				</li>
				<li>
					<p>Maintain social distancing<br/>
					<small>Maintain at least 1 metre (3 feet) distance between yourself and anyone who is coughing or sneezing.</small></p>
				</li>
				<li>
					<p>Avoid touching eyes, nose and mouth</p>
				</li>
				<li>
					<p>Practice respiratory hygiene<br/>
					<small>Make sure you, and the people around you, follow good respiratory hygiene. This means covering your mouth and nose with your bent elbow or tissue when you cough or sneeze. Then dispose of the used tissue immediately.</small></p>
				</li>
				<li>
					<p>If you have fever, cough and difficulty breathing, seek medical care early<br/>
					<small>Stay home if you feel unwell. If you have a fever, cough and difficulty breathing, seek medical attention and call in advance. Follow the directions of your local health authority.</small></p>
				</li>
				<li>
					<p>Stay informed and follow advice given by your healthcare provider<br/>
					<small>Stay informed on the latest developments about COVID-19. Follow advice given by your healthcare provider, your national and local public health authority or your employer on how to protect yourself and others from COVID-19.</small></p>
				</li>
			</ul>

			<p>For more information and safety tips, go to <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public" target="_blank">WHO</a> website.</p>

			<div className="embed-container">
				<iframe className="embed-iframe" src="https://www.youtube.com/embed/bPITHEiFWLc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
			</div>
		</div>

		<style jsx> {`
			.embed-container {
				position: relative;
				overflow: hidden;
				padding-top: 56.25%;
				margin: 2rem 0;
			}
			.embed-iframe {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				border: 0;
			}
		`}
		</style>
		</>
	)
}

export default withLayout(What)
