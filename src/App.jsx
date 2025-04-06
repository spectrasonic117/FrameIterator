import React, { useState } from "react";

function App() {
	const [fileName, setFileName] = useState("");
	const [dirPath, setDirPath] = useState("");
	const [numIterations, setNumIterations] = useState("");
	const [startFrame, setStartFrame] = useState("");
	const [mode, setMode] = useState("Nexo (Eventinator)");
	const [yamlContent, setYamlContent] = useState("");

	const handleGenerate = () => {
		const iterations = Number.parseInt(numIterations, 10);
		const start = Number.parseInt(startFrame, 10);
		if (Number.isNaN(iterations) || Number.isNaN(start)) return;

		let content = "";
		// Se define el límite según el modo:
		// "Nexo (AnimationsCore)" e "ItemsAdder (AnimationsCore)" usan hexadecimal (0-4095)
		// mientras que "Nexo (Eventinator)" e "ItemsAdder (Eventinator)" usan decimal (0-999)
		const frameLimit =
			mode === "Nexo (AnimationsCore)" ||
			mode === "ItemsAdder (AnimationsCore)"
				? 4095
				: 999;

		for (let i = 0; i < iterations; i++) {
			const currentFrame = start + i;
			if (currentFrame > frameLimit) break;

			// Se calcula el valor del frame dependiendo del modo numérico.
			const frameValue =
				mode === "Nexo (AnimationsCore)" ||
				mode === "ItemsAdder (AnimationsCore)"
					? currentFrame.toString(16).toUpperCase().padStart(3, "0")
					: currentFrame.toString().padStart(3, "0");

			// Generación del YAML en función del modo de iteración seleccionado.
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
		setYamlContent(content);
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(yamlContent);
	};

	const handleDownload = () => {
		const blob = new Blob([yamlContent], {
			type: "text/yaml;charset=utf-8",
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${fileName || "archivo"}.yml`;
		a.click();
		URL.revokeObjectURL(url);
	};

	const handleReset = () => {
		setFileName("");
		setDirPath("");
		setNumIterations("");
		setStartFrame("");
		setYamlContent("");
		setMode("Nexo (Eventinator)");
	};

	return (
		<div className='min-h-screen bg-gray-900 text-white p-8'>
			<h1 className='text-3xl mb-6 font-bold text-center'>
				Frame Iterator
			</h1>
			<div className='bg-gray-800 p-6 rounded shadow-md w-full'>
				{/* Primera fila: Nombre del archivo y Ruta */}
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
							Ruta del directorio: (ruta de Minecraft)
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
				{/* Segunda fila: Número de iteraciones y Número inicial */}
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
				{/* Dropdown para seleccionar el modo de iteración */}
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
				{/* Botones centrados */}
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
				{/* Área de texto para el YAML con funcionalidad de copiar al hacer clic */}
				<div>
					<label className='block mb-1'>
						Contenido YML generado (clic para copiar):
					</label>
					<textarea
						value={yamlContent}
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
