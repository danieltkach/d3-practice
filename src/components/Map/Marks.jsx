import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3';
import styles from './styles.module.scss';

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({ data: { countries, interiors } }) => {
	return (
		<g className={styles.marks}>
			<path className={styles.sphere}
				d={path({ type: 'Sphere' })}
			/>
			<path className={styles.graticules}
				d={path(graticule())}
			/>
			{
				countries.features.map(feature => (
					<path className={styles.country}
						d={path(feature)}
					/>
				))
			}
			<path className={styles.interiors}
				d={path(interiors)}
			/>
		</g>
	)
}