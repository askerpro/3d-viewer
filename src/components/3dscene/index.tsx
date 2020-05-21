/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { MouseEvent } from 'react';
import {
  DirectionalLight,
  Color,
  FogExp2,
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  GridHelper,
  AxesHelper,
  Raycaster,
  Vector2,
  Vector3,
  ArrowHelper,
} from 'three';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line no-unused-vars
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { SceneWrapper } from './elements';

interface Props {
  items: File[];
}

const fbxLoader = new FBXLoader();
let orbitControls: OrbitControls;
let transformControl: TransformControls;
const scene = new Scene();
let camera: PerspectiveCamera;
const renderer = new WebGLRenderer();
const raycaster = new Raycaster();

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const MyScene: React.FC<Props> = ({ items }) => {
  const sceneWrapperRef = React.useRef<HTMLDivElement>(null);

  const width = () => {
    return sceneWrapperRef.current!.getBoundingClientRect().width;
  };

  const height = () => {
    return sceneWrapperRef.current!.getBoundingClientRect().height;
  };

  const getAspectRatio = () => {
    return width() / height();
  };

  React.useEffect(() => {
    // Adding helpers and background
    scene.add(new GridHelper(1000, 10));
    scene.add(new AxesHelper(100));
    scene.background = new Color(0xcccccc);

    // setting up the Camera
    camera = new PerspectiveCamera(60, getAspectRatio());
    camera.position.set(200, 200, 200);

    // Adding lights
    const light = new DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);

    // Adding controls
    orbitControls = new OrbitControls(camera, renderer.domElement);
    transformControl = new TransformControls(camera, renderer.domElement);
    transformControl.addEventListener('dragging-changed', (event) => {
      orbitControls.enabled = !event.value;
      orbitControls.update();
    });
    scene.add(transformControl);

    renderer.setSize(width(), height());
    renderer.setPixelRatio(window.devicePixelRatio);

    sceneWrapperRef.current!.appendChild(renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    const cancelId = requestAnimationFrame(animate);

    window.onresize = () => {
      camera.aspect = getAspectRatio();
      camera.updateProjectionMatrix();

      renderer.setSize(width(), height());
    };

    return () => {
      cancelAnimationFrame(cancelId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateActiveObject = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const xOffset = sceneWrapperRef.current?.getBoundingClientRect().left!;
    const yOffset = sceneWrapperRef.current?.getBoundingClientRect().top!;
    const x = ((event.clientX - xOffset) / width()) * 2 - 1;
    const y = -((event.clientY - yOffset) / height()) * 2 + 1;
    raycaster.setFromCamera(new Vector2(x, y), camera);
    const scene3dObjects = scene.children.filter(
      (child) => child.type === 'Group',
    );
    const scene3dObjectNames = scene3dObjects.map((obj) => obj.name);
    const intersects = raycaster.intersectObjects(scene3dObjects, true);
    if (intersects.length) {
      const parentObjectIndex = scene3dObjectNames.indexOf(
        intersects[0].object.name,
      );
      if (parentObjectIndex >= 0) {
        transformControl.attach(scene3dObjects[parentObjectIndex]);
      }
    }
  };

  React.useEffect(() => {
    items.forEach((item) => {
      if (!scene.getObjectByName(item.name)) {
        toBase64(item).then((buffer) => {
          fbxLoader.load(buffer, (obj) => {
            obj.traverse((child) => {
              child.castShadow = true;
              child.receiveShadow = true;
              child.name = item.name;
            });
            obj.name = item.name;
            transformControl.attach(obj);
            scene.add(obj);
          });
        });
      }
    });
  }, [items]);

  return <SceneWrapper ref={sceneWrapperRef} onClick={updateActiveObject} />;
};

export default MyScene;
