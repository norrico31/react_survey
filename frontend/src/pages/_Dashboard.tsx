import { ReactElement, useState } from 'react';
import { PageContent } from '../components/'

const names = [
    {
        firstName: 'Gerald',
        lastName: 'Biason',
        children: [
            {
                firstName: 'Yuta',
                lastName: 'Okkotsu',
                children: [
                    {
                        firstName: 'Makima',
                        lastName: 'Control Devil',
                        children: [
                            {
                                firstName: 'Ryoumen',
                                lastName: 'Sukuna',
                            }
                        ]
                    }
                ]
            },
            {
                firstName: 'Gojou',
                lastName: 'Satoru',
                // children: [
                //     {
                //         firstName: 'Denji',
                //         lastName: 'Chainsaw'
                //     }
                // ]
            }
        ]
    }
]
interface INames {
    firstName: string
    lastName: string
    children?: INames[]
    depth?: number
}

function RenderNames({ firstName, lastName, children, depth = 1 }: INames): ReactElement {
    const [toggle, setToggle] = useState(false)
    return <div style={{ paddingLeft: `${depth + 10}px` }}>
        {lastName} - {firstName} {children && <button onClick={() => setToggle(!toggle)} style={{ outline: '1px solid limegreen', padding: '10px 16px', marginLeft: 10 }}>Show</button>}
        {toggle && children?.map((child: INames, idx: number) => <RenderNames {...child} key={idx} depth={depth + 1} />)}
    </div>
}

export default function Dashboard() {
    return (
        <>
            <PageContent title='Dashboard'>
                {names.map((name, idx) => <RenderNames key={idx} {...name} depth={1} />)}
            </PageContent>
        </>
    )
}
