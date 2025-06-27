import React, { useState } from "react";

function App() {
	const [fileName, setFileName] = useState("");
	const [dirPath, setDirPath] = useState("");
	const [numIterations, setNumIterations] = useState("");
	const [startFrame, setStartFrame] = useState("");
	const [mode, setMode] = useState("Nexo (Eventinator)");
	const [outputFormat, setOutputFormat] = useState("yml"); // Estado para formato (YML/JSON)
	const [generatedContent, setGeneratedContent] = useState("");

	const handleGenerate = () => {
		const iterations = Number.parseInt(numIterations, 10);
		const start = Number.parseInt(startFrame, 10);
		if (Number.isNaN(iterations) || Number.isNaN(start)) return;

		let content = "";
		const frameLimit =
			mode === "Nexo (AnimationsCore)" ||
			mode === "ItemsAdder (AnimationsCore)"
				? 4095
				: 999;

		// Array para almacenar las iteraciones en JSON
		const frames = [];

		for (let i = 0; i < iterations; i++) {
			const currentFrame = start + i;
			if (currentFrame > frameLimit) break;

			const frameValue =
				mode === "Nexo (AnimationsCore)" ||
				mode === "ItemsAdder (AnimationsCore)"
					? currentFrame.toString(16).toUpperCase().padStart(3, "0")
					: currentFrame.toString().padStart(3, "0");

			// Crear el objeto de cada iteración
			const frame = {
				type: "bitmap",
				file: `${dirPath}/${fileName}_${i + 1}`,
				ascent: 30,
				height: 64,
				// Solo un backslash
				chars: [`\\uE${frameValue}`], // Aseguramos que solo haya un backslash
			};

			// Añadir el objeto al array de frames
			frames.push(frame);
		}

		// Generar el contenido en formato JSON
		if (outputFormat === "json") {
			content = `{ "providers": [\n`;
			frames.forEach((frame, index) => {
				// Convertir el objeto a JSON y reemplazar los dobles backslashes
				let frameContent = JSON.stringify(frame, null, 2);
				// Reemplazar los dobles backslashes por uno solo
				frameContent = frameContent.replace(/\\\\/g, "\\");

				content += frameContent;
				// Agregar coma solo si no es la última iteración
				if (index < frames.length - 1) {
					content += ",";
				}
				content += "\n";
			});
			content += `] }`;
		} else {
			// Generación del contenido en formato YAML
			for (let i = 0; i < iterations; i++) {
				const currentFrame = start + i;
				if (currentFrame > frameLimit) break;

				const frameValue =
					mode === "Nexo (AnimationsCore)" ||
					mode === "ItemsAdder (AnimationsCore)"
						? currentFrame
								.toString(16)
								.toUpperCase()
								.padStart(3, "0")
						: currentFrame.toString().padStart(3, "0");

				if (
					mode === "ItemsAdder (Eventinator)" ||
					mode === "ItemsAdder (AnimationsCore)"
				) {
					content += `${fileName}_${i + 1}:\n`;
					content += `  show_in_gui: false\n`;
					content += `  path: "${dirPath}/${fileName}_${i + 1}"\n`;
					content += `  symbol: "\\uE${frameValue}"\n`;
					content += `  scale_ratio: 30\n`;
					content += `  y_position: 64\n`;
				} else {
					content += `${fileName}_${i + 1}:\n`;
					content += `  texture: "${dirPath}/${fileName}_${i + 1}"\n`;
					content += `  ascent: 30\n`;
					content += `  height: 64\n`;
					content += `  char: "\\uE${frameValue}"\n`;
				}
			}
		}

		// Actualizar el contenido generado en el estado
		setGeneratedContent(content);
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(generatedContent);
	};

	const handleDownload = () => {
		const blob = new Blob([generatedContent], {
			type:
				outputFormat === "json"
					? "application/json;charset=utf-8"
					: "text/yaml;charset=utf-8",
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${fileName || "archivo"}.${outputFormat}`;
		a.click();
		URL.revokeObjectURL(url);
	};

	const handleReset = () => {
		setFileName("");
		setDirPath("");
		setNumIterations("");
		setStartFrame("");
		setGeneratedContent("");
		setMode("Nexo (Eventinator)");
		setOutputFormat("yml"); // Resetear formato a YAML
	};

	return (
		<div className='min-h-screen bg-gray-900 text-white p-8'>
			<h1 className='text-3xl mb-6 font-bold text-center'>
				Frame Iterator
			</h1>
			<div className='bg-gray-800 p-6 rounded shadow-md w-full'>
				{/* Nombre del archivo y Ruta */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
					<div>
						<label className='block mb-1'>
							Nombre del archivo:
						</label>
						<input
							type='text'
							value={fileName}
							onChange={(e) => setFileName(e.target.value)}
							className='w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='animation_frame'
						/>
					</div>
					<div>
						<label className='block mb-1'>
							Ruta del directorio:
						</label>
						<input
							type='text'
							value={dirPath}
							onChange={(e) => setDirPath(e.target.value)}
							className='w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='animation/animation_1'
						/>
					</div>
				</div>
				{/* Iteraciones y Número Inicial */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
					<div>
						<label className='block mb-1'>
							Número de iteraciones:
						</label>
						<input
							type='number'
							value={numIterations}
							onChange={(e) => setNumIterations(e.target.value)}
							className='w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='40, 100, 200, etc'
						/>
					</div>
					<div>
						<label className='block mb-1'>
							Número inicial (0-
							{mode === "Nexo (AnimationsCore)" ||
							mode === "ItemsAdder (AnimationsCore)"
								? "4095"
								: "999"}
							):
						</label>
						<input
							type='number'
							value={startFrame}
							onChange={(e) => setStartFrame(e.target.value)}
							className='w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='0'
						/>
					</div>
				</div>
				{/* Modo de iteración */}
				<div className='mb-6'>
					<label className='block mb-1'>Modo de iteración:</label>
					<select
						value={mode}
						onChange={(e) => setMode(e.target.value)}
						className='w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
						<option value='Nexo (Eventinator)'>
							Nexo (Eventinator)
						</option>
						<option value='Nexo (AnimationsCore)'>
							Nexo (AnimationsCore)
						</option>
						<option value='ItemsAdder (Eventinator)'>
							ItemsAdder (Eventinator)
						</option>
						<option value='ItemsAdder (AnimationsCore)'>
							ItemsAdder (AnimationsCore)
						</option>
					</select>
				</div>
				{/* Formato de salida */}
				<div className='mb-6'>
					<label className='block mb-1'>Formato de salida:</label>
					<select
						value={outputFormat}
						onChange={(e) => setOutputFormat(e.target.value)}
						className='w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'>
						<option value='yml'>YML</option>
						<option value='json'>JSON</option>
					</select>
				</div>
				{/* Botones */}
				<div className='flex flex-wrap gap-2 justify-center mb-6'>
					<button
						onClick={handleGenerate}
						className='bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded font-semibold'>
						Generar
					</button>
					<button
						onClick={handleCopy}
						className='bg-green-600 hover:bg-green-500 px-4 py-2 rounded font-semibold'>
						Copiar
					</button>
					<button
						onClick={handleDownload}
						className='bg-yellow-600 hover:bg-yellow-500 px-4 py-2 rounded font-semibold'>
						Descargar
					</button>
					<button
						onClick={handleReset}
						className='bg-red-600 hover:bg-red-500 px-4 py-2 rounded font-semibold'>
						Resetear
					</button>
				</div>
				{/* Área de texto para el contenido generado */}
				<div>
					<label className='block mb-1'>
						Contenido generado (clic para copiar):
					</label>
					<textarea
						value={generatedContent}
						readOnly
						onKeyPress={handleCopy}
						className='w-full h-64 p-2 rounded bg-gray-700 border border-gray-600 resize-none focus:outline-none cursor-pointer'
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
