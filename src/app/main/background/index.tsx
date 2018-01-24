import * as React from 'react';
import * as THREE from 'three';
import {Wall} from './wall';
import {AirParticles} from './air-particles';
import {isGL} from '../../../utils/game/is-gl';
import {renderIfTrue} from '../../../utils/react';
import {CenteredText} from '../../widgets/CenteredText';

interface IProps {
    parentEl: HTMLDivElement;
    docScroll: number;
    width: number;
    height: number;
    textBoundary: number;
}

interface IState {
    isFallback: boolean;
    mx?: number;
    my?: number;
}

export class Background extends React.Component<IProps, IState> {
    scene;
    camera;
    renderer;
    animateLoop;
    light;
    airParticles = new AirParticles();
    wall = new Wall();

    public constructor(props?: any, context?: any) {
        super(props, context);
        this.state = {
            isFallback: false,
            mx: 0,
            my: 0
        };
    }

    componentDidMount() {
        window.addEventListener('mousemove', this.handleMouseMove);
        if (isGL())  {
            this.initGL();
        } else {
            this.initGLFallback();
        }
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.animateLoop);

        window.removeEventListener('mousemove', this.handleMouseMove);

        if (isGL()) {
            this.props.parentEl.removeChild( this.renderer.domElement );
        }
    }

    componentWillReceiveProps(nextProps) {
        const { height, width } = this.props;

        const isHeightChanged = nextProps.height !== height;
        const isWidthChanged = nextProps.width !== width;

        if (isHeightChanged || isWidthChanged) {
            this.renderer.setSize( nextProps.width, nextProps.height );
            this.camera.aspect = nextProps.width / nextProps.height;
            this.camera.updateProjectionMatrix();
        }
    }

    handleMouseMove = (e) => {
        this.setState({
            mx: e.pageX,
            my: e.pageY
        });
    };

    initGL() {
        this.initRenderer();

        this.initLighting();
        this.initScene();

        this.initCamera();

        this.animate();
    }

    initGLFallback() {
        this.setState({ isFallback: true });
    }

    initRenderer() {
        const { height, width } = this.props;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( width, height );
        this.props.parentEl.appendChild( this.renderer.domElement );
    }

    initCamera() {
        const { height, width } = this.props;

        this.camera = new THREE.PerspectiveCamera(
            45,
            width / height,
            1,
            8000
        );
        this.camera.position.z = 80;
    }

    initLighting() {
        this.light = new THREE.AmbientLight( 0xFFFFFF, 0.25 );
    }

    initScene() {
        this.scene = new THREE.Scene();
        this.wall.init();
        this.scene.add(this.airParticles.render());
        this.scene.add(this.wall.render());
    }

    animate() {
        this.animateLoop = requestAnimationFrame( this.animate.bind(this) );
        this.renderMotion();
    }

    renderMotion() {
        this.airParticles.animate(this.props.docScroll);
        this.renderer.render( this.scene, this.camera );
    }

    render(): JSX.Element {
        return (
            <div>
                {renderIfTrue(this.state.isFallback, () =>
                    <CenteredText
                        content="Unable to view due to browser or browser settings. Try another browser or reconfigure your current browser."
                    />
                )}
            </div>

        );
    }
}
