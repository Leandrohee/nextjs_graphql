'use client';

import type { Variants } from 'motion/react';
import { stagger } from 'motion/react';
import * as motion from 'motion/react-client';
import { useRouter } from 'next/navigation';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { useApolloClient, useLazyQuery } from '@apollo/client/react';
import { SIGNOUT_QUERY } from '@/api/graphql/queries/user/graphql';
import { SignOut_QueryQuery } from '@/api/graphql/__generated__/graphql';
import { toast } from 'sonner';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { height } = useDimensions(containerRef);

  return (
    <div>
      <div className="relative flex items-stretch flex-1 w-full h-20 rounded-[20px]">
        <motion.nav
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          custom={height}
          ref={containerRef}
          className="w-[300px]"
        >
          <motion.div
            className="absolute top-0 right-0 bottom-0 w-[300px] h-[500px] bg-[#bbbbbb] rounded-bl-[20px] z-2"
            variants={sidebarVariants}
          />
          <Navigation />
          <MenuToggle toggle={() => setIsOpen(!isOpen)} />
        </motion.nav>
      </div>
    </div>
  );
}

const navVariants = {
  open: {
    transition: { delayChildren: stagger(0.07, { startDelay: 0.2 }) },
  },
  closed: {
    transition: { delayChildren: stagger(0.05, { from: 'last' }) },
  },
};

const Itens = [
  {
    name: 'Home',
    url: '/home',
  },
  {
    name: 'Example1',
    url: '/home/example1',
  },
  {
    name: 'Example2',
    url: '/home/example2',
  },
  {
    name: 'Sign out',
    url: '/',
  },
];

const Navigation = () => (
  <motion.ul
    className="list-none p-[25px] m-0 absolute top-20 right-0 w-[230px] h-[400px] z-100"
    variants={navVariants}
  >
    {Itens.map((i, index) => (
      <MenuItem i={i} key={index} />
    ))}
  </motion.ul>
);

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const MenuItem = ({ i }: { i: { name: string; url: string } }) => {
  const router = useRouter();
  const client = useApolloClient();
  const [fnSignout] = useLazyQuery<SignOut_QueryQuery>(SIGNOUT_QUERY);

  const handleItemClick = async (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    i: { name: string; url: string }
  ) => {
    if (i.name === 'Sign out') {
      try {
        const res = await fnSignout();
        const result = res.data?.signOut;

        if (!result?.success) {
          throw new Error(res.data?.signOut.message ?? 'Error on sign out');
        }

        //Cleaning the cache completly
        await client.clearStore();

        toast.success(result.message, {
          style: {
            background: '#79df8d',
          },
          duration: 1000,
        });

        router.push(i.url);
      } catch (error: any) {
        toast.error(error.message ?? 'Error', {
          style: {
            background: '#fecaca',
            font: 'bold',
          },
        });
        throw new Error(error.message ?? 'Error');
      }
    } else {
      router.push(i.url);
    }
  };

  return (
    <motion.li
      className="flex items-center justify-start p-0 m-0 list-none mb-5 cursor-pointer"
      variants={itemVariants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className="rounded-[20px] w-full h-10 flex justify-center items-center border-2 border-black"
        onClick={(event) => handleItemClick(event, i)}
      >
        <p className="text-sm">{i.name}</p>
      </div>
    </motion.li>
  );
};

const sidebarVariants: Variants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(30px at 246px 40px)',
    transition: {
      delay: 0.2,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

interface PathProps {
  d?: string;
  variants: Variants;
  transition?: { duration: number };
}

const Path = (props: PathProps) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({ toggle }: { toggle: () => void }) => (
  <button
    className="outline-none border-none select-none cursor-pointer absolute top-[18px] right-[15px] w-[50px] h-[50px] rounded-full bg-transparent z-10"
    onClick={toggle}
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </svg>
  </button>
);

/**
 * ==============   Utils   ================
 */

// Naive implementation - in reality would want to attach
// a window or resize listener. Also use state/layoutEffect instead of ref/effect
// if this is important to know on initial client render.
// It would be safer to  return null for unmeasured states.
const useDimensions = (ref: React.RefObject<HTMLDivElement | null>) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
  }, [ref]);

  return dimensions.current;
};
