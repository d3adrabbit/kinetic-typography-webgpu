import { useEffect } from "react";
import {
  Engine3D,
  Scene3D,
  Object3D,
  Camera3D,
  MeshRenderer,
  HoverCameraController,
  View3D,
  SphereGeometry,
  ComponentBase,
  Time,
  Color,
  Vector4,
  Vector3,
  UnLitMaterial,
  TorusGeometry,
} from "@orillusion/core";

import "./App.css";

class AnimationScript extends ComponentBase {
  private material: UnLitMaterial | undefined;

  start() {
    let mr = this.object3D.getComponent(MeshRenderer);
    this.material = mr.material;
  }

  onUpdate() {
    let delta = Time.time * 0.001;
    this.material!.uvTransform_1 = new Vector4(delta, -delta, -3, 8);
  }
}

class AnimationScript2 extends ComponentBase {
  private material: UnLitMaterial | undefined;
  start() {
    let mr = this.object3D.getComponent(MeshRenderer);
    this.material = mr.material;
  }

  onUpdate() {
    let delta = Time.time * 0.002;
    this.material!.uvTransform_1 = new Vector4(0, -delta, -6, 4);
  }
}

function App() {
  const init = async () => {
    await Engine3D.init({
      canvasConfig: {
        alpha: true,
        devicePixelRatio: 2,
      },
    });

    let scene3D: Scene3D = new Scene3D();

    // camera
    let cameraObj = new Object3D();
    let camera = cameraObj.addComponent(Camera3D);
    camera.perspective(60, Engine3D.aspect, 1, 5000.0);
    let hoverController = cameraObj.addComponent(HoverCameraController);
    hoverController.setCamera(0, 0, 15, new Vector3(0, 0, 0));
    scene3D.addChild(cameraObj);

    let texture = await Engine3D.res.loadTexture("/texture.png");

    const obj = new Object3D();
    const mr = obj.addComponent(MeshRenderer);

    mr.geometry = new SphereGeometry(2, 64, 64);
    const material = new UnLitMaterial();
    material.baseColor = new Color(1, 1, 1, 1);
    material.baseMap = texture;
    material.uvTransform_1 = new Vector4(0, 0, -3, 8);
    mr.material = material;
    obj.addComponent(AnimationScript);
    obj.rotationX = 135;
    obj.rotationY = 15;
    obj.y = 1;

    scene3D.addChild(obj);

    const obj2 = new Object3D();
    const mr2 = obj2.addComponent(MeshRenderer);
    mr2.geometry = new TorusGeometry(3, 0.5, 32, 32);
    const material2 = new UnLitMaterial();
    material2.baseColor = new Color(1, 1, 1, 1);
    material2.baseMap = texture;
    material2.uvTransform_1 = new Vector4(0, 0, -6, 4);
    mr2.material = material2;
    obj2.addComponent(AnimationScript2);
    obj2.rotationX = 90;
    obj2.y = 1;
    scene3D.addChild(obj2);

    let view = new View3D();
    view.scene = scene3D;
    view.camera = camera;
    Engine3D.startRenderView(view);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="App">
      <div className="text-warp">
        <div className="title">
          <div>Kinetic</div>
          <div>typography</div>
        </div>

        <div className="sub-title">
          made by d3adrabbit
          <span className="line">|</span>
          <a href="https://github.com/d3adrabbit/kinetic-typography-webgpu" className="link">
            github
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
