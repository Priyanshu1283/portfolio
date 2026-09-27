"use client";

import Image from "next/image";
import {
  animated,
  to,
  useSpring,
} from "@react-spring/web";
import {
  useCallback,
  useRef,
} from "react";

interface HangingCardProps {
  className?: string;
}

/*
|--------------------------------------------------------------------------
| Constants
|--------------------------------------------------------------------------
*/

const CARD_WIDTH = 370;
const CARD_TOP = 165;

const MAX_X = 70;
const MAX_Y = 35;

const MAX_TILT = 28;

/*
|--------------------------------------------------------------------------
| Barcode
|--------------------------------------------------------------------------
*/

const BARCODE = [
  18, 28, 22, 34, 17,
  30, 24, 38, 20, 31,
  16, 27, 36, 19, 30,
  23, 39, 18, 28, 34,
  21, 31, 17, 37, 24,
  30, 19, 35, 22, 32,
  17, 28, 38, 21, 31,
  18, 35, 24, 29, 37,
  20, 31, 18, 34, 25,
];

export default function HangingCard({
  className = "",
}: HangingCardProps) {
  /*
  |--------------------------------------------------------------------------
  | Container
  |--------------------------------------------------------------------------
  */

  const containerRef =
    useRef<HTMLDivElement>(null);

  /*
  |--------------------------------------------------------------------------
  | Physics state
  |--------------------------------------------------------------------------
  |
  | IMPORTANT:
  |
  | These values are stored inside refs rather than React state.
  | Pointer movement can happen hundreds of times per second.
  |
  */

  const physics = useRef({
    pointerX: 0,
    pointerY: 0,

    velocityX: 0,
    velocityY: 0,

    lastPointerX: 0,
    lastPointerY: 0,

    lastTime: 0,

    /*
     * Current accumulated rotation.
     *
     * This can become:
     *
     * 90
     * 180
     * 360
     * 720
     * etc.
     */
    spin: 0,

    /*
     * Pendulum angle.
     */
    tilt: 0,

    active: false,
  });

  /*
  |--------------------------------------------------------------------------
  | Spring
  |--------------------------------------------------------------------------
  |
  | x       -> horizontal movement
  | y       -> vertical movement
  | tilt    -> pendulum angle
  | spin    -> accumulated Z rotation
  |
  */

  const [{ x, y, tilt, spin }, api] =
    useSpring(() => ({
      x: 0,
      y: 0,
      tilt: 0,
      spin: 0,

      config: {
        mass: 1.8,
        tension: 120,
        friction: 18,
      },
    }));

  /*
  |--------------------------------------------------------------------------
  | Pointer Enter
  |--------------------------------------------------------------------------
  */

  const handlePointerEnter = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    const now = performance.now();

    physics.current.active = true;

    physics.current.lastPointerX =
      event.clientX;

    physics.current.lastPointerY =
      event.clientY;

    physics.current.lastTime = now;

    /*
     * Don't inherit a crazy velocity when
     * the mouse first enters.
     */
    physics.current.velocityX = 0;
    physics.current.velocityY = 0;
  };

  /*
  |--------------------------------------------------------------------------
  | Pointer Move
  |--------------------------------------------------------------------------
  */

  const handlePointerMove = useCallback(
    (
      event: React.PointerEvent<HTMLDivElement>,
    ) => {
      const element =
        containerRef.current;

      if (!element) return;

      const rect =
        element.getBoundingClientRect();

      /*
       * --------------------------------------------------------------
       * Pointer position
       * --------------------------------------------------------------
       */

      const centerX =
        rect.left + rect.width / 2;

      const centerY =
        rect.top + rect.height / 2;

      const normalizedX =
        (event.clientX - centerX) /
        (rect.width / 2);

      const normalizedY =
        (event.clientY - centerY) /
        (rect.height / 2);

      const pointerX = Math.max(
        -1,
        Math.min(1, normalizedX),
      );

      const pointerY = Math.max(
        -1,
        Math.min(1, normalizedY),
      );

      /*
       * --------------------------------------------------------------
       * Velocity
       * --------------------------------------------------------------
       */

      const now = performance.now();

      const rawDelta =
        now - physics.current.lastTime;

      const deltaTime = Math.max(
        8,
        Math.min(50, rawDelta),
      );

      const movementX =
        event.clientX -
        physics.current.lastPointerX;

      const movementY =
        event.clientY -
        physics.current.lastPointerY;

      const velocityX =
        (movementX / deltaTime) * 16;

      const velocityY =
        (movementY / deltaTime) * 16;

      /*
       * Smooth velocity.
       *
       * Prevents the card from becoming
       * too sensitive to tiny mouse changes.
       */

      physics.current.velocityX =
        physics.current.velocityX * 0.72 +
        velocityX * 0.28;

      physics.current.velocityY =
        physics.current.velocityY * 0.72 +
        velocityY * 0.28;

      /*
       * Save pointer data.
       */

      physics.current.pointerX =
        pointerX;

      physics.current.pointerY =
        pointerY;

      physics.current.lastPointerX =
        event.clientX;

      physics.current.lastPointerY =
        event.clientY;

      physics.current.lastTime =
        now;

      physics.current.active = true;

      /*
       * --------------------------------------------------------------
       * Pendulum
       * --------------------------------------------------------------
       *
       * Horizontal movement produces the biggest
       * pendulum effect.
       */

      const targetTilt =
        pointerX * MAX_TILT +
        physics.current.velocityX * 2.2;

      physics.current.tilt =
        physics.current.tilt * 0.65 +
        targetTilt * 0.35;

      /*
       * --------------------------------------------------------------
       * 360° spin
       * --------------------------------------------------------------
       *
       * Fast horizontal drag accumulates Z rotation.
       * Sensitivity is higher so a sweep gives a full 360°.
       */

      physics.current.spin +=
        physics.current.velocityX * 2.8;

      /*
       * --------------------------------------------------------------
       * Spring update
       * --------------------------------------------------------------
       */

      api.start({
        x: pointerX * MAX_X,

        y: pointerY * MAX_Y,

        tilt: physics.current.tilt,

        spin: physics.current.spin,

        config: {
          mass: 1.7,
          tension: 125,
          friction: 18,
        },
      });
    },
    [api],
  );

  /*
  |--------------------------------------------------------------------------
  | Pointer Leave
  |--------------------------------------------------------------------------
  |
  | When the mouse leaves:
  |
  | The card doesn't instantly stop.
  | It gets released and naturally returns.
  |
  */

  const handlePointerLeave = () => {
    physics.current.active = false;

    /*
     * Reset spin back to 0 so the card always returns
     * to its upright initial position when released.
     * The spring animates it smoothly back.
     */
    physics.current.spin = 0;
    physics.current.tilt  = 0;

    api.start({
      x: 0,
      y: 0,
      tilt: 0,
      spin: 0,

      config: {
        mass: 2.8,
        tension: 60,
        friction: 14,
      },
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Thread endpoint
  |--------------------------------------------------------------------------
  |
  | The card moves by x/y.
  |
  | The thread therefore needs to connect:
  |
  |       anchor
  |          ●
  |          |
  |          |
  |          ● card attachment
  |
  */

  const threadPath = to(
    [x, y],
    (xValue, yValue) => {
      const startX =
        CARD_WIDTH / 2;

      const startY = 18;

      const endX =
        CARD_WIDTH / 2 + xValue;

      const endY =
        CARD_TOP + yValue;

      /*
       * Slight curve.
       *
       * This makes the thread feel flexible
       * rather than being a rigid straight line.
       */

      const controlX =
        (startX + endX) / 2;

      const controlY =
        startY +
        (endY - startY) * 0.55;

      return `
        M ${startX} ${startY}
        Q ${controlX} ${controlY}
          ${endX} ${endY}
      `;
    },
  );

  /*
  |--------------------------------------------------------------------------
  | Card transform
  |--------------------------------------------------------------------------
  |
  | transform-origin is TOP CENTER.
  |
  | This is critical.
  |
  | The card behaves like a real hanging object.
  |
  */

  const cardTransform = to(
    [x, y, tilt, spin],
    (
      xValue,
      yValue,
      tiltValue,
      spinValue,
    ) => {
      return `
        translate3d(
          ${xValue}px,
          ${yValue}px,
          0
        )

        rotateX(
          ${-tiltValue * 0.18}deg
        )

        rotateY(
          ${tiltValue * 0.55}deg
        )

        rotateZ(
          ${spinValue}deg
        )
      `;
    },
  );

  /*
  |--------------------------------------------------------------------------
  | Shadow
  |--------------------------------------------------------------------------
  */

  const shadowTransform = to(
    [x, y],
    (xValue, yValue) => {
      return `
        translate(
          ${-xValue * 0.35}px,
          ${-yValue * 0.2}px
        )
      `;
    },
  );

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div
      ref={containerRef}
      onPointerEnter={
        handlePointerEnter
      }
      onPointerMove={
        handlePointerMove
      }
      onPointerLeave={
        handlePointerLeave
      }
      className={`
        relative
        h-[620px]
        w-full
        select-none
        ${className}
      `}
      style={{
        perspective: "1400px",
        touchAction: "none",
      }}
    >
      {/* ============================================================
          AMBIENT GLOW
          ============================================================ */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[230px]
          h-[420px]
          w-[420px]
          -translate-x-1/2
          rounded-full
          bg-violet-300/10
          blur-[120px]
          dark:bg-violet-700/10
        "
      />

      {/* ============================================================
          FIXED TOP ANCHOR
          ============================================================ */}

      <div
        className="
          absolute
          left-1/2
          top-[8px]
          z-40
          h-[18px]
          w-[18px]
          -translate-x-1/2
          rounded-full
          border
          border-neutral-500
          bg-neutral-900
          shadow-[0_3px_8px_rgba(0,0,0,0.3)]
          dark:bg-neutral-200
        "
      />

      {/* ============================================================
          THREAD
          ============================================================ */}

      <svg
        className="
          pointer-events-none
          absolute
          inset-0
          z-20
          h-full
          w-full
          overflow-visible
        "
        viewBox={`0 0 ${CARD_WIDTH} 680`}
        preserveAspectRatio="xMidYMin meet"
      >
        {/* Main thread */}

        <animated.path
          d={threadPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="
            text-neutral-800
            dark:text-neutral-300
          "
        />

        {/* Subtle thread highlight */}

        <animated.path
          d={threadPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.7"
          strokeLinecap="round"
          className="
            text-white/60
            dark:text-white/30
          "
        />
      </svg>

      {/* ============================================================
          CARD WRAPPER
          ============================================================ */}

      <animated.div
        className="
          absolute
          left-1/2
          top-[165px]
          z-30
          w-[360px]
          max-w-[90vw]
          -translate-x-1/2
        "
        style={{
          transform:
            cardTransform,

          transformOrigin:
            "50% 0%",

          transformStyle:
            "preserve-3d",

          willChange:
            "transform",
        }}
      >
        {/* ==========================================================
            SHADOW
            ========================================================== */}

        <animated.div
          className="
            pointer-events-none
            absolute
            -bottom-12
            left-[8%]
            h-[50px]
            w-[84%]
            rounded-full
            bg-black/25
            blur-2xl
            dark:bg-black/60
          "
          style={{
            transform:
              shadowTransform,
          }}
        />

        {/* ==========================================================
            ID CARD
            ========================================================== */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[30px]
            border
            border-black/[0.08]
            bg-white
            shadow-[0_35px_90px_rgba(0,0,0,0.16)]
            dark:border-white/[0.1]
            dark:bg-[#101010]
          "
          style={{
            transformStyle:
              "preserve-3d",
          }}
        >
          {/* ========================================================
              HEADER
              ======================================================== */}

          <div
            className="
              relative
              h-[190px]
              overflow-hidden
              bg-gradient-to-br
              from-violet-600
              via-purple-500
              to-blue-400
              dark:from-violet-800
              dark:via-purple-700
              dark:to-blue-700
            "
          >
            {/* Dot pattern */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-25
                [background-image:radial-gradient(rgba(255,255,255,0.75)_1px,transparent_1px)]
                [background-size:14px_14px]
              "
            />

            {/* Light glow */}

            <div
              className="
                pointer-events-none
                absolute
                -right-20
                -top-24
                h-[280px]
                w-[280px]
                rounded-full
                bg-white/40
                blur-[70px]
              "
            />

            {/* Profile image */}

            <div
              className="
                absolute
                left-1/2
                top-7
                h-[115px]
                w-[115px]
                -translate-x-1/2
                overflow-hidden
                rounded-full
                border-[4px]
                border-cyan-300
                bg-neutral-200
                shadow-[0_12px_32px_rgba(0,0,0,0.25)]
              "
              style={{
                transform:
                  "translateZ(30px)",
              }}
            >
              <Image
                src="/profile.jpg"
                alt="Priyanshu Kumar"
                fill
                priority
                sizes="115px"
                className="object-cover"
              />
            </div>
          </div>

          {/* ========================================================
              CONTENT
              ======================================================== */}

          <div
            className="
              px-7
              pb-6
              pt-6
            "
          >
            {/* Name */}

            <div className="text-center">
              <h2
                className="
                  text-[22px]
                  font-extrabold
                  tracking-[-0.03em]
                  text-black
                  dark:text-white
                "
                style={{ fontFamily: "var(--font-inter, Inter, sans-serif)" }}
              >
                Priyanshu Kumar
              </h2>

              <div
                className="
                  mx-auto
                  mt-2
                  inline-flex
                  rounded-full
                  border
                  border-black/10
                  px-4
                  py-[5px]
                  text-[12px]
                  font-bold
                  tracking-[0.06em]
                  uppercase
                  text-neutral-600
                  dark:border-white/10
                  dark:text-neutral-300
                "
              >
                Software Engineer
              </div>
            </div>

            {/* Divider */}

            <div
              className="
                my-5
                h-px
                bg-neutral-200
                dark:bg-neutral-800
              "
            />

            {/* Information */}

            <div
              className="
                grid
                grid-cols-2
                gap-x-6
                gap-y-5
                rounded-2xl
                border
                border-black/[0.08]
                p-5
                dark:border-white/10
              "
            >
              <CardInfo
                label="Specialty"
                value="Full-Stack & AI"
              />

              <CardInfo
                label="Location"
                value="India"
              />

              <CardInfo
                label="Focus"
                value="Web & Backend"
              />

              <div>
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-neutral-400
                  "
                >
                  Status
                </p>

                <p
                  className="
                    mt-2
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-bold
                    text-emerald-500
                  "
                >
                  <span
                    className="
                      h-2.5
                      w-2.5
                      rounded-full
                      bg-emerald-500
                    "
                  />

                  Available
                </p>
              </div>
            </div>

            {/* Barcode */}

            <div
              className="
                mt-4
                overflow-hidden
                rounded-xl
                border
                border-black/[0.08]
                px-4
                py-3
                dark:border-white/10
              "
            >
              <div
                className="
                  flex
                  h-9
                  items-end
                  justify-center
                  gap-[3px]
                "
              >
                {BARCODE.map(
                  (height, index) => (
                    <span
                      key={index}
                      style={{
                        height: `${height}px`,
                      }}
                      className="
                        w-[2px]
                        bg-black
                        dark:bg-white
                      "
                    />
                  ),
                )}
              </div>
            </div>

            {/* Footer */}

            <div
              className="
                mt-2
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  text-[10px]
                  font-black
                  tracking-[0.12em]
                  uppercase
                  text-neutral-700
                  dark:text-neutral-300
                "
              >
                PK-2026-PRO
              </span>

              <span
                className="
                  text-[9px]
                  font-bold
                  tracking-[0.1em]
                  uppercase
                  text-neutral-400
                "
              >
                SWE · INDIA
              </span>
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Card information
|--------------------------------------------------------------------------
*/

function CardInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p
        className="
          text-[10px]
          font-bold
          uppercase
          tracking-wider
          text-neutral-400
        "
      >
        {label}
      </p>

      <p
        className="
          mt-2
          text-sm
          font-bold
          text-neutral-900
          dark:text-white
        "
      >
        {value}
      </p>
    </div>
  );
}